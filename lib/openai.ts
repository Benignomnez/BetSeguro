import OpenAI from "openai";
import type { Game } from "./odds-api";
import https from "https";

// Create HTTPS agent with more relaxed SSL options
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // This is less secure but helps bypass SSL issues
  secureOptions:
    require("constants").SSL_OP_NO_TLSv1 |
    require("constants").SSL_OP_NO_TLSv1_1,
});

// Initialize the OpenAI client
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  return new OpenAI({
    apiKey,
    timeout: 30000, // 30 second timeout
    maxRetries: 3,
    httpAgent: httpsAgent, // Use our configured HTTPS agent
    dangerouslyAllowBrowser: true, // Allow usage in browser-like environments
  });
};

export async function generateGameInsight(game: Game): Promise<string> {
  try {
    // Try to use the development-only static insight generator during development
    if (process.env.NODE_ENV === "development") {
      console.log("Using static AI insights in development mode");
      return generateFallbackInsight(game);
    }

    const openai = getOpenAIClient();

    const prompt = `
You are a sports analyst providing insights on upcoming games.

Game Information:
- Sport: ${game.sportTitle}
- Teams: ${game.homeTeam.name} (Home) vs ${game.awayTeam.name} (Away)
- Date: ${game.date}
- Home Team Win Probability: ${game.homeWinProbability}%
- Away Team Win Probability: ${game.awayWinProbability}%
- Predicted Winner: ${game.predictedWinner}
- Risk Level: ${game.riskLevel}

Provide a concise analysis (2-3 paragraphs) of this upcoming game. Include:
1. Why the predicted winner is favored
2. Key factors that could influence the outcome
3. Any notable context about the teams' recent performance
4. How confident the prediction is based on the risk level

Keep your response under 200 words and focus on providing valuable insights for sports bettors.
`;

    // Set an external timeout for the API call as a backup
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("OpenAI API request timed out")),
        20000
      );
    });

    // First try the fetch-based approach
    try {
      const apiPromise = openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable sports analyst providing concise, insightful analysis of upcoming games.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      // Race the API call against the timeout
      const response = (await Promise.race([
        apiPromise,
        timeoutPromise,
      ])) as Awaited<typeof apiPromise>;

      if (!response?.choices?.[0]?.message?.content) {
        throw new Error("OpenAI returned an empty response");
      }

      return response.choices[0].message.content;
    } catch (error) {
      console.error(
        "Error with OpenAI API call, falling back to static insight:",
        error
      );
      return generateFallbackInsight(game);
    }
  } catch (error) {
    console.error(
      "Error generating game insight:",
      error instanceof Error ? error.message : error
    );

    // Fallback response if OpenAI call fails
    return generateFallbackInsight(game);
  }
}

// Fallback function for when OpenAI API fails
function generateFallbackInsight(game: Game): string {
  const homeTeamCode = game.homeTeam.code;
  const awayTeamCode = game.awayTeam.code;
  const homeWinProb = game.homeWinProbability;
  const awayWinProb = game.awayWinProbability;
  const diff = Math.abs(homeWinProb - awayWinProb);

  if (homeWinProb > awayWinProb) {
    if (diff > 30) {
      return `${homeTeamCode} is heavily favored to win this matchup against ${awayTeamCode} with a ${homeWinProb}% win probability. The odds strongly suggest ${homeTeamCode} has significant advantages in this matchup, likely due to superior recent performance, home field advantage, and possibly favorable pitching matchups.`;
    } else if (diff > 15) {
      return `${homeTeamCode} has a moderate edge over ${awayTeamCode} in this matchup with a ${homeWinProb}% win probability. While ${homeTeamCode} is favored, this game still has some uncertainty. Key factors to watch include starting pitchers and recent team momentum.`;
    } else {
      return `This is projected to be a close game between ${homeTeamCode} and ${awayTeamCode}, with ${homeTeamCode} having a slight edge at ${homeWinProb}% win probability. With such a tight margin, this game could easily go either way and may come down to in-game decisions and performance.`;
    }
  } else {
    if (diff > 30) {
      return `${awayTeamCode} is heavily favored to win this matchup against ${homeTeamCode} with a ${awayWinProb}% win probability, despite playing away. The odds strongly suggest ${awayTeamCode} has significant advantages in this matchup, likely due to superior recent performance and possibly favorable pitching matchups.`;
    } else if (diff > 15) {
      return `${awayTeamCode} has a moderate edge over ${homeTeamCode} in this matchup with a ${awayWinProb}% win probability. While ${awayTeamCode} is favored despite playing away, this game still has some uncertainty. Key factors to watch include starting pitchers and recent team momentum.`;
    } else {
      return `This is projected to be a close game between ${homeTeamCode} and ${awayTeamCode}, with ${awayTeamCode} having a slight edge at ${awayWinProb}% win probability despite playing away. With such a tight margin, this game could easily go either way and may come down to in-game decisions and performance.`;
    }
  }
}
