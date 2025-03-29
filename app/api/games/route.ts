import { NextRequest, NextResponse } from "next/server";
import { fetchUpcomingGames } from "@/lib/odds-api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get("sport") || "baseball_mlb";

    const games = await fetchUpcomingGames(sport);

    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error("API error in games route:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
