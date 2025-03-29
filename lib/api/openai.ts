/**
 * Utility for interacting with OpenAI API
 */

// Define the structure of a game for AI analysis
export interface GameForAnalysis {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeWinProbability: number;
  awayWinProbability: number;
  sportType: string;
  commenceTime: string;
}

// Response structure from the AI analysis
export interface AIInsightResponse {
  prediction: string;
  winner: string;
  riskLevel: "Low" | "Medium" | "High";
  explanation: string;
  confidence: number;
}

// Mock OpenAI API for demo purposes
export class OpenAIClient {
  /**
   * Generates AI insights for a sports game
   * Note: This is a mock implementation for demo purposes
   */
  async generateGameInsight(game: GameForAnalysis): Promise<AIInsightResponse> {
    // In a real implementation, this would call the OpenAI API
    // For demo purposes, we'll return mock data based on the win probabilities

    // Determine winner based on probabilities
    const winner =
      game.homeWinProbability > game.awayWinProbability
        ? game.homeTeam
        : game.awayTeam;

    const winnerProb = Math.max(
      game.homeWinProbability,
      game.awayWinProbability
    );
    const loserProb = Math.min(
      game.homeWinProbability,
      game.awayWinProbability
    );
    const loser = winner === game.homeTeam ? game.awayTeam : game.homeTeam;

    // Determine risk level based on probability difference
    let riskLevel: "Low" | "Medium" | "High";
    if (winnerProb >= 70) {
      riskLevel = "Low";
    } else if (winnerProb >= 55) {
      riskLevel = "Medium";
    } else {
      riskLevel = "High";
    }

    // Generate explanation based on risk level
    let explanation = "";
    if (riskLevel === "Low") {
      explanation = `${winner} is heavily favored to win this matchup against ${loser} with a ${winnerProb.toFixed(
        0
      )}% win probability. The odds strongly suggest ${winner} has significant advantages in this matchup, likely due to superior recent performance.`;
    } else if (riskLevel === "Medium") {
      explanation = `${winner} has a moderate edge in this matchup against ${loser} with a ${winnerProb.toFixed(
        0
      )}% win probability. While ${winner} is favored, there are some factors that make this prediction less certain.`;
    } else {
      explanation = `This is a very close matchup between ${winner} and ${loser}, with ${winner} having just a slight edge at ${winnerProb.toFixed(
        0
      )}% win probability. Consider this a high-risk bet as either team could realistically win.`;
    }

    // Form the complete response
    return {
      prediction: `${winner} to win`,
      winner,
      riskLevel,
      explanation,
      confidence: winnerProb,
    };
  }

  /**
   * In a real implementation, this would be a method to call OpenAI's API
   * For demo purposes, this is just a placeholder
   */
  private async callOpenAI(prompt: string): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return "This would be the OpenAI API response in a real implementation.";
  }
}
