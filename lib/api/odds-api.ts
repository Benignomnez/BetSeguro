/**
 * Client for The Odds API to fetch sports odds data
 * Documentation: https://the-odds-api.com
 */

export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface GameOdds {
  id: string;
  sport_key: string;
  sport_title?: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY || "";
const API_HOST = "https://api.the-odds-api.com";
const API_VERSION = "v4";

export class OddsApiClient {
  private apiKey: string;

  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  /**
   * Fetches a list of available sports
   */
  async getSports(): Promise<Sport[]> {
    try {
      const url = `${API_HOST}/${API_VERSION}/sports/?apiKey=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching sports:", error);
      return [];
    }
  }

  /**
   * Fetches odds for a specific sport
   * @param sportKey - The sport key (e.g., 'americanfootball_nfl')
   * @param regions - Regions for the odds (e.g., 'us', 'uk', 'eu')
   * @param markets - Markets to include (e.g., 'h2h', 'spreads', 'totals')
   * @param oddsFormat - Format of the odds ('american' or 'decimal')
   */
  async getOdds(
    sportKey: string,
    regions: string = "us",
    markets: string = "h2h",
    oddsFormat: string = "american"
  ): Promise<GameOdds[]> {
    try {
      const url = `${API_HOST}/${API_VERSION}/sports/${sportKey}/odds/?apiKey=${this.apiKey}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching odds for ${sportKey}:`, error);
      return [];
    }
  }

  /**
   * Fetches upcoming games with odds across all sports
   * @param regions - Regions for the odds (e.g., 'us', 'uk', 'eu')
   * @param markets - Markets to include (e.g., 'h2h', 'spreads', 'totals')
   * @param oddsFormat - Format of the odds ('american' or 'decimal')
   */
  async getUpcomingOdds(
    regions: string = "us",
    markets: string = "h2h",
    oddsFormat: string = "american"
  ): Promise<GameOdds[]> {
    try {
      const url = `${API_HOST}/${API_VERSION}/sports/upcoming/odds/?apiKey=${this.apiKey}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching upcoming odds:", error);
      return [];
    }
  }
}
