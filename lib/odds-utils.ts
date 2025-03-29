/**
 * Convert American odds to implied probability
 * @param americanOdds The American odds (e.g. -110, +150)
 * @returns Probability as a percentage (0-100)
 */
export function oddsToWinProbability(americanOdds: number): number {
  if (americanOdds > 0) {
    // Positive odds (underdog)
    return Number(((100 / (americanOdds + 100)) * 100).toFixed(1))
  } else {
    // Negative odds (favorite)
    const absOdds = Math.abs(americanOdds)
    return Number(((absOdds / (absOdds + 100)) * 100).toFixed(1))
  }
}

/**
 * Determine risk level based on win probability difference
 */
export function calculateRiskLevel(homeProb: number, awayProb: number): "Low" | "Medium" | "High" {
  const diff = Math.abs(homeProb - awayProb)

  if (diff > 30) {
    return "Low"
  } else if (diff > 15) {
    return "Medium"
  } else {
    return "High"
  }
}

/**
 * Format date to display in UI
 */
export function formatGameDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

/**
 * Format time to display in UI
 */
export function formatGameTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Get team code from full name (e.g. "New York Yankees" -> "NYY")
 */
export function getTeamCode(teamName: string): string {
  const teamCodes: Record<string, string> = {
    // MLB Teams
    "Arizona Diamondbacks": "ARI",
    "Atlanta Braves": "ATL",
    "Baltimore Orioles": "BAL",
    "Boston Red Sox": "BOS",
    "Chicago Cubs": "CHC",
    "Chicago White Sox": "CWS",
    "Cincinnati Reds": "CIN",
    "Cleveland Guardians": "CLE",
    "Colorado Rockies": "COL",
    "Detroit Tigers": "DET",
    "Houston Astros": "HOU",
    "Kansas City Royals": "KC",
    "Los Angeles Angels": "LAA",
    "Los Angeles Dodgers": "LAD",
    "Miami Marlins": "MIA",
    "Milwaukee Brewers": "MIL",
    "Minnesota Twins": "MIN",
    "New York Mets": "NYM",
    "New York Yankees": "NYY",
    "Oakland Athletics": "OAK",
    "Philadelphia Phillies": "PHI",
    "Pittsburgh Pirates": "PIT",
    "San Diego Padres": "SD",
    "San Francisco Giants": "SF",
    "Seattle Mariners": "SEA",
    "St. Louis Cardinals": "STL",
    "Tampa Bay Rays": "TB",
    "Texas Rangers": "TEX",
    "Toronto Blue Jays": "TOR",
    "Washington Nationals": "WSH",

    // Add other sports teams as needed
    "New Zealand": "NZ",
    Pakistan: "PAK",
  }

  return teamCodes[teamName] || teamName.substring(0, 3).toUpperCase()
}

