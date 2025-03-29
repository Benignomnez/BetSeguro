import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { Game } from "@/lib/odds-api";
import https from "https";

// Create HTTPS agent with more relaxed SSL options
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // This is less secure but helps bypass SSL issues
  secureOptions:
    require("constants").SSL_OP_NO_TLSv1 |
    require("constants").SSL_OP_NO_TLSv1_1,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const game = body.game;

    if (!game) {
      return NextResponse.json(
        { error: "Game data is required" },
        { status: 400 }
      );
    }

    // Always use fallback in development to avoid API costs
    if (process.env.NODE_ENV === "development") {
      console.log("Using fallback insight in development mode");
      return NextResponse.json({ insight: generateFallbackInsight(game) });
    }

    // Initialize OpenAI client inside the API route
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      httpAgent: httpsAgent,
      timeout: 30000,
      maxRetries: 3,
    });

    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set, using fallback insight");
      return NextResponse.json({ insight: generateFallbackInsight(game) });
    }

    // Set up a timeout for the OpenAI request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("OpenAI request timed out")), 15000);
    });

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

    try {
      const responsePromise = openai.chat.completions.create({
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

      // Race the OpenAI request against the timeout
      const response = (await Promise.race([
        responsePromise,
        timeoutPromise,
      ])) as Awaited<typeof responsePromise>;
      const insight =
        response?.choices?.[0]?.message?.content ||
        generateFallbackInsight(game);

      return NextResponse.json({ insight });
    } catch (openaiError) {
      console.error("OpenAI API call failed:", openaiError);
      return NextResponse.json({ insight: generateFallbackInsight(game) });
    }
  } catch (error) {
    console.error("Error in API route:", error);

    // Try to extract game data from the request for fallback
    let game;
    try {
      const body = await request.json();
      game = body.game;
    } catch (e) {
      // If we can't parse the request, return a generic message
      return NextResponse.json(
        {
          insight:
            "Unable to generate AI insight at this time. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Fallback response if OpenAI call fails
    const fallbackInsight = game
      ? generateFallbackInsight(game)
      : "Unable to generate AI insight at this time. Please try again later.";

    return NextResponse.json({ insight: fallbackInsight });
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
