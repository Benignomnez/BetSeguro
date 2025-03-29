"use client";

import { useState, useEffect } from "react";
import {
  OpenAIClient,
  GameForAnalysis,
  AIInsightResponse,
} from "@/lib/api/openai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Brain, AlertTriangle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";

export default function AIInsightDemo() {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<GameForAnalysis | null>(
    null
  );
  const [insight, setInsight] = useState<AIInsightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Initialize OpenAI client
  const client = new OpenAIClient();

  // Mock game data
  const mockGames: GameForAnalysis[] = [
    {
      id: "1",
      homeTeam: "New York Mets",
      awayTeam: "Houston Astros",
      homeWinProbability: 92,
      awayWinProbability: 8,
      sportType: "MLB",
      commenceTime: new Date(Date.now() + 86400000).toISOString(),
    },
    {
      id: "2",
      homeTeam: "Boston Red Sox",
      awayTeam: "Chicago Cubs",
      homeWinProbability: 60,
      awayWinProbability: 40,
      sportType: "MLB",
      commenceTime: new Date(Date.now() + 2 * 86400000).toISOString(),
    },
    {
      id: "3",
      homeTeam: "Los Angeles Dodgers",
      awayTeam: "San Francisco Giants",
      homeWinProbability: 52,
      awayWinProbability: 48,
      sportType: "MLB",
      commenceTime: new Date(Date.now() + 3 * 86400000).toISOString(),
    },
  ];

  // Set initial selected game
  useEffect(() => {
    if (mockGames.length > 0) {
      setSelectedGame(mockGames[0]);
    }
  }, []);

  // Generate insight when selected game changes
  useEffect(() => {
    if (selectedGame) {
      generateInsight(selectedGame);
    }
  }, [selectedGame]);

  // Function to generate insight
  const generateInsight = async (game: GameForAnalysis) => {
    setLoading(true);
    try {
      const result = await client.generateGameInsight(game);
      setInsight(result);
      setError("");
    } catch (err) {
      setError("Failed to generate AI insight");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get risk level color
  const getRiskColor = (riskLevel: "Low" | "Medium" | "High") => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-800 p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          <AnimatedText text="AI-Powered Insights Demo" element="span" />
        </h3>
        <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
          <AnimatedText text="GPT-4o" element="span" />
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-purple-400/30">
          <div className="text-white font-medium mb-3">
            <AnimatedText text="Select a Game" element="h4" />
          </div>
          <div className="flex flex-wrap gap-2">
            {mockGames.map((game) => (
              <Button
                key={game.id}
                variant={selectedGame?.id === game.id ? "default" : "outline"}
                className={
                  selectedGame?.id === game.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white/20 text-white hover:bg-white/30 border-purple-300/30"
                }
                onClick={() => setSelectedGame(game)}
              >
                {game.homeTeam} vs {game.awayTeam}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
            <div className="font-medium text-indigo-800 flex items-center gap-2">
              <Brain className="h-4 w-4 text-indigo-600" />
              <AnimatedText text="AI Game Analysis" element="span" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100"
              onClick={() => selectedGame && generateInsight(selectedGame)}
              disabled={loading || !selectedGame}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              <AnimatedText text="Regenerate" element="span" />
            </Button>
          </div>

          {error ? (
            <div className="p-8 text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-700">{error}</p>
            </div>
          ) : (
            <div className="p-5">
              {selectedGame && insight && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium">
                      {selectedGame.homeTeam} vs {selectedGame.awayTeam}
                    </h4>
                    <Badge className={getRiskColor(insight.riskLevel)}>
                      {insight.riskLevel} Risk
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{selectedGame.homeTeam}</span>
                        <span>{selectedGame.homeWinProbability}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${selectedGame.homeWinProbability}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{selectedGame.awayTeam}</span>
                        <span>{selectedGame.awayWinProbability}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{
                            width: `${selectedGame.awayWinProbability}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 text-base py-1 px-3 mb-3">
                      {insight.prediction}
                    </Badge>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200">
                    <p>{insight.explanation}</p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      <span>View Full Analysis</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {loading && (
                <div className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 text-indigo-500 mx-auto mb-2 animate-spin" />
                  <p className="text-gray-700">Generating AI insight...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
