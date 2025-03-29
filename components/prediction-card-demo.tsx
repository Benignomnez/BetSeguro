"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  ChevronRight,
  AlertTriangle,
  LineChart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";

// Simplified combined game data
interface PredictionGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  sportKey: string;
  commenceTime: string;
  homeOdds: number;
  awayOdds: number;
  homeWinProb: number;
  awayWinProb: number;
  prediction: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  explanation: string;
}

export default function PredictionCardDemo() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<PredictionGame | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock prediction data
  const mockPredictions: PredictionGame[] = [
    {
      id: "1",
      homeTeam: "New York Mets",
      awayTeam: "Houston Astros",
      sportKey: "baseball_mlb",
      commenceTime: new Date(Date.now() + 86400000).toISOString(),
      homeOdds: -220,
      awayOdds: 180,
      homeWinProb: 92,
      awayWinProb: 8,
      prediction: "New York Mets to win",
      confidence: 92,
      riskLevel: "Low",
      explanation:
        "New York Mets is heavily favored to win this matchup against Houston Astros with a 92% win probability. The odds strongly suggest NYM has significant advantages in this matchup, likely due to superior recent performance.",
    },
  ];

  // Set initial active game
  useEffect(() => {
    if (mockPredictions.length > 0) {
      setActiveGame(mockPredictions[0]);
    }
  }, []);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get risk level color and text
  const getRiskInfo = (riskLevel: "Low" | "Medium" | "High") => {
    switch (riskLevel) {
      case "Low":
        return {
          color: "bg-green-100 text-green-800 hover:bg-green-100",
          icon: <Zap className="h-3 w-3 mr-1" />,
          text: "Low Risk",
        };
      case "Medium":
        return {
          color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          icon: <TrendingUp className="h-3 w-3 mr-1" />,
          text: "Medium Risk",
        };
      case "High":
        return {
          color: "bg-red-100 text-red-800 hover:bg-red-100",
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
          text: "High Risk",
        };
      default:
        return {
          color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
          icon: <TrendingUp className="h-3 w-3 mr-1" />,
          text: "Unknown Risk",
        };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {activeGame ? (
        <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                {activeGame.sportKey.split("_")[1]?.toUpperCase()}
              </Badge>
              <div className="text-sm opacity-80">
                {formatDate(activeGame.commenceTime)}
              </div>
            </div>
            <h3 className="text-xl font-bold">
              {activeGame.homeTeam} vs {activeGame.awayTeam}
            </h3>
          </div>

          {/* Body */}
          <div className="p-4">
            {/* Probabilities */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">
                  {activeGame.homeTeam}
                </span>
                <div className="flex items-center">
                  <span className="text-sm mr-2 text-gray-600">
                    {activeGame.homeOdds > 0
                      ? `+${activeGame.homeOdds}`
                      : activeGame.homeOdds}
                  </span>
                  <span className="text-sm font-medium">
                    {activeGame.homeWinProb}%
                  </span>
                </div>
              </div>
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${activeGame.homeWinProb}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">
                  {activeGame.awayTeam}
                </span>
                <div className="flex items-center">
                  <span className="text-sm mr-2 text-gray-600">
                    {activeGame.awayOdds > 0
                      ? `+${activeGame.awayOdds}`
                      : activeGame.awayOdds}
                  </span>
                  <span className="text-sm font-medium">
                    {activeGame.awayWinProb}%
                  </span>
                </div>
              </div>
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full"
                  style={{ width: `${activeGame.awayWinProb}%` }}
                ></div>
              </div>
            </div>

            {/* Prediction */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-gray-900">AI Prediction</div>
                <Badge className={getRiskInfo(activeGame.riskLevel).color}>
                  <div className="flex items-center">
                    {getRiskInfo(activeGame.riskLevel).icon}
                    <span>{getRiskInfo(activeGame.riskLevel).text}</span>
                  </div>
                </Badge>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3 text-center">
                <div className="font-medium text-blue-800">
                  {activeGame.prediction}
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Analysis
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
                {activeGame.explanation}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                <span>Refresh</span>
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <span>View Details</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <RefreshCw className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
          <p className="text-gray-700">Loading prediction...</p>
        </div>
      )}
    </div>
  );
}
