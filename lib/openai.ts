import OpenAI from "openai";
import type { Game } from "./odds-api";
import https from "https";
import { generateFallbackInsight } from "./insight-utils";

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

// Export the fallback generator for use by other modules
export { generateFallbackInsight };
