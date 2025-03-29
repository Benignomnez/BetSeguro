import { Game } from "./odds-api";

// Client-side wrappers for server actions
export async function fetchClientGameById(id: string): Promise<Game | null> {
  try {
    const response = await fetch(`/api/games/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    return null;
  }
}

export async function fetchClientUpcomingGames(
  sport = "baseball_mlb"
): Promise<Game[]> {
  try {
    const response = await fetch(`/api/games?sport=${sport}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming games:", error);
    return [];
  }
}

export async function generateClientAiInsight(game: Game): Promise<string> {
  try {
    const response = await fetch("/api/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate insight: ${response.status}`);
    }

    const data = await response.json();
    return data.insight;
  } catch (error) {
    console.error("Error generating AI insight:", error);
    return generateFallbackInsight(game);
  }
}

// Fallback function for when API call fails
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
