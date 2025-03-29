import { NextRequest, NextResponse } from "next/server";
import { generateAiInsight } from "@/app/actions";
import { Game } from "@/lib/odds-api";

export async function POST(request: NextRequest) {
  try {
    const { game } = (await request.json()) as { game: Game };

    if (!game) {
      return NextResponse.json(
        { error: "Game data is required" },
        { status: 400 }
      );
    }

    const insight = await generateAiInsight(game);

    return NextResponse.json({ insight }, { status: 200 });
  } catch (error) {
    console.error("API error in insight route:", error);
    return NextResponse.json(
      { error: "Failed to generate insight" },
      { status: 500 }
    );
  }
}
