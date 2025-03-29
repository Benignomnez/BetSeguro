import { NextResponse } from "next/server";
import { validateEnvVars } from "@/lib/env-check";
import { fetchUpcomingGames } from "@/lib/odds-api";
import { generateGameInsight } from "@/lib/openai";

// This is a test endpoint that should be disabled in production
export async function GET() {
  // Only allow this endpoint in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    // Check environment variables
    const envCheckResult = {
      success: true,
      message: "All required environment variables are present",
    };
    try {
      validateEnvVars();
    } catch (error) {
      if (error instanceof Error) {
        envCheckResult.success = false;
        envCheckResult.message = error.message;
      }
    }

    // Test Odds API
    const oddsApiStart = Date.now();
    const gamesResult = { success: false, message: "", count: 0, time: 0 };

    try {
      const games = await fetchUpcomingGames("baseball_mlb");
      gamesResult.success = true;
      gamesResult.count = games.length;
      gamesResult.message =
        games.length > 0
          ? `Successfully fetched ${games.length} games`
          : "API connection successful but no games available";
    } catch (error) {
      gamesResult.message =
        error instanceof Error ? error.message : "Unknown error fetching games";
    }

    gamesResult.time = Date.now() - oddsApiStart;

    // Test OpenAI API if we have games
    const openaiResult = { success: false, message: "", time: 0 };

    if (gamesResult.success && gamesResult.count > 0) {
      const openaiStart = Date.now();
      try {
        const games = await fetchUpcomingGames("baseball_mlb");
        if (games.length > 0) {
          const insight = await generateGameInsight(games[0]);
          openaiResult.success = true;
          openaiResult.message = insight.substring(0, 50) + "...";
        } else {
          openaiResult.message = "No games available to test OpenAI";
        }
      } catch (error) {
        openaiResult.message =
          error instanceof Error
            ? error.message
            : "Unknown error generating insight";
      }
      openaiResult.time = Date.now() - openaiStart;
    } else {
      openaiResult.message =
        "Skipped OpenAI test because no games were available";
    }

    // Return test results
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      envCheck: envCheckResult,
      oddsApi: gamesResult,
      openai: openaiResult,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error during testing",
      },
      { status: 500 }
    );
  }
}
