import {
  oddsToWinProbability,
  calculateRiskLevel,
  getTeamCode,
} from "./odds-utils";
import { getTeamLogo } from "./team-logos";

export interface Game {
  id: string;
  sportKey: string;
  sportTitle: string;
  commenceTime: string;
  homeTeam: {
    name: string;
    code: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    code: string;
    logo: string;
  };
  homeWinProbability: number;
  awayWinProbability: number;
  predictedWinner: string;
  riskLevel: "Low" | "Medium" | "High";
  date: string;
  time: string;
}

interface OddsApiResponse {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    title: string;
    last_update: string;
    markets: Array<{
      key: string;
      last_update: string;
      outcomes: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
}

// List of supported sports - only include sports that are currently in season
const supportedSports = [
  "baseball_mlb",
  "basketball_nba",
  "icehockey_nhl",
  // 'football_nfl' - Commented out as it's not currently in season
];

// Cache control - in milliseconds
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Validate the ODDS_API_KEY is present
const getOddsApiKey = (): string => {
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    throw new Error("ODDS_API_KEY environment variable is not set");
  }

  return apiKey;
};

export async function fetchUpcomingGames(sport?: string): Promise<Game[]> {
  try {
    const apiKey = getOddsApiKey();

    // If a specific sport is requested (not 'all')
    if (sport && sport !== "all") {
      return await fetchSportGames(sport, apiKey);
    }

    // If 'all' sports are requested, fetch all supported sports with Promise.allSettled
    // to handle individual sport API failures gracefully
    const allGamesPromises = supportedSports.map((sportKey) =>
      fetchSportGames(sportKey, apiKey)
    );

    const allGamesResults = await Promise.allSettled(allGamesPromises);

    // Process the results, including both fulfilled and rejected promises
    const games = allGamesResults.flatMap((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        console.warn(
          `Failed to fetch games for ${supportedSports[index]}: ${result.reason}`
        );
        return [];
      }
    });

    return games;
  } catch (error) {
    console.error(
      "Error fetching upcoming games:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

async function fetchSportGames(sport: string, apiKey: string): Promise<Game[]> {
  try {
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=us&markets=h2h&oddsFormat=american`;

    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATION / 1000 }, // Convert ms to seconds
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data for ${sport}: ${response.status} ${response.statusText}`
      );
    }

    const data: OddsApiResponse[] = await response.json();

    // If no games are available, return empty array
    if (!data || data.length === 0) {
      console.log(`No games available for ${sport}`);
      return [];
    }

    // Transform the API response into our Game format
    return data.map((game) => {
      // Get the first bookmaker with h2h market
      const bookmaker = game.bookmakers[0];
      let homeOdds = 0;
      let awayOdds = 0;

      if (bookmaker) {
        const h2hMarket = bookmaker.markets.find(
          (market) => market.key === "h2h"
        );
        if (h2hMarket) {
          const homeOutcome = h2hMarket.outcomes.find(
            (outcome) => outcome.name === game.home_team
          );
          const awayOutcome = h2hMarket.outcomes.find(
            (outcome) => outcome.name === game.away_team
          );

          homeOdds = homeOutcome ? homeOutcome.price : 0;
          awayOdds = awayOutcome ? awayOutcome.price : 0;
        }
      }

      const homeWinProbability = oddsToWinProbability(homeOdds);
      const awayWinProbability = oddsToWinProbability(awayOdds);
      const homeTeamCode = getTeamCode(game.home_team);
      const awayTeamCode = getTeamCode(game.away_team);
      const predictedWinner =
        homeWinProbability > awayWinProbability ? homeTeamCode : awayTeamCode;
      const riskLevel = calculateRiskLevel(
        homeWinProbability,
        awayWinProbability
      );

      const gameDate = new Date(game.commence_time);

      return {
        id: game.id,
        sportKey: game.sport_key,
        sportTitle: game.sport_title,
        commenceTime: game.commence_time,
        homeTeam: {
          name: game.home_team,
          code: homeTeamCode,
          logo: getTeamLogo(homeTeamCode),
        },
        awayTeam: {
          name: game.away_team,
          code: awayTeamCode,
          logo: getTeamLogo(awayTeamCode),
        },
        homeWinProbability,
        awayWinProbability,
        predictedWinner,
        riskLevel,
        date: gameDate.toISOString().split("T")[0],
        time: gameDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`Timeout fetching ${sport} games`);
    } else {
      console.error(
        `Error fetching ${sport} games:`,
        error instanceof Error ? error.message : error
      );
    }
    return [];
  }
}

// Add game caching
let gameCache: Game[] = [];
let lastCacheTime = 0;

export async function fetchGameById(id: string): Promise<Game | null> {
  try {
    // Check if cache is still valid
    const now = Date.now();
    if (gameCache.length > 0 && now - lastCacheTime < CACHE_DURATION) {
      const cachedGame = gameCache.find((game) => game.id === id);
      if (cachedGame) {
        return cachedGame;
      }
    }

    // If not in cache or cache expired, fetch all games
    const games = await fetchUpcomingGames();

    // Update cache
    gameCache = games;
    lastCacheTime = now;

    return games.find((game) => game.id === id) || null;
  } catch (error) {
    console.error(
      "Error fetching game by ID:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
