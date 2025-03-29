"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Percent,
  Calendar,
  Trophy,
  Timer,
  LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchClientGameById } from "@/lib/client-api";
import { notFound, useParams } from "next/navigation";
import AiInsightWrapper from "@/components/ai-insight-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ClientImage from "@/components/client-image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";

export default function GamePredictionPage() {
  const params = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      try {
        const id = params.id;
        const gameData = await fetchClientGameById(id);
        if (!gameData) {
          setError(true);
          return;
        }
        setGame(gameData);
      } catch (err) {
        console.error("Error loading game prediction page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <SiteHeader />
        <main className="flex-1">
          <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !game) {
    return notFound();
  }

  const gameDate = new Date(game.commenceTime);
  const now = new Date();
  const isPastGame = gameDate < now;

  let riskBadge = <Badge className="bg-green-500">Low Risk</Badge>;
  let riskIcon = null;

  if (game.awayWinProbability > 40 && game.homeWinProbability > 40) {
    riskBadge = <Badge className="bg-red-500">High Risk</Badge>;
    riskIcon = <AlertTriangle className="h-4 w-4 mr-1" />;
  } else if (game.awayWinProbability > 35 && game.homeWinProbability > 35) {
    riskBadge = <Badge className="bg-yellow-500">Medium Risk</Badge>;
    riskIcon = <AlertTriangle className="h-4 w-4 mr-1" />;
  }

  let winnerBg = "from-green-500 to-green-700";
  if (riskIcon) {
    winnerBg =
      game.awayWinProbability > 40 && game.homeWinProbability > 40
        ? "from-red-500 to-red-700"
        : "from-yellow-500 to-yellow-700";
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <Breadcrumbs
              items={[
                {
                  href: "/predictions",
                  translationKey: "navigation.predictions",
                },
                {
                  href: `/predictions/${params.id}`,
                  label: `${game.homeTeam.code} vs ${game.awayTeam.code}`,
                },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                  {game.homeTeam.code} vs {game.awayTeam.code}
                </h1>
                <div className="flex items-center gap-2">
                  {riskIcon}
                  {riskBadge}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {gameDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <Timer className="h-4 w-4 mr-2" />
                  {gameDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="font-normal">
                    {game.sportKey.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4 items-center">
                {/* Home Team */}
                <div className="col-span-3 flex flex-col items-center text-center">
                  <div className="w-24 h-24 flex items-center justify-center mb-4 p-2 bg-white rounded-full shadow-sm border border-gray-100">
                    <ClientImage
                      src={game.homeTeam.logo || "/placeholder.svg"}
                      alt={game.homeTeam.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {game.homeTeam.code}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {game.homeTeam.name}
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold uppercase text-gray-500">
                      Win Probability
                    </span>
                    <div className="text-xl font-bold flex items-center gap-1">
                      {game.homeWinProbability}
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* VS */}
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold text-gray-400">VS</div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white mt-2">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>

                {/* Away Team */}
                <div className="col-span-3 flex flex-col items-center text-center">
                  <div className="w-24 h-24 flex items-center justify-center mb-4 p-2 bg-white rounded-full shadow-sm border border-gray-100">
                    <ClientImage
                      src={game.awayTeam.logo || "/placeholder.svg"}
                      alt={game.awayTeam.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {game.awayTeam.code}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {game.awayTeam.name}
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold uppercase text-gray-500">
                      Win Probability
                    </span>
                    <div className="text-xl font-bold flex items-center gap-1">
                      {game.awayWinProbability}
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Win Probability Bar */}
              <div className="mt-8 mb-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${game.homeWinProbability}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{game.homeTeam.code}</span>
                  <span>{game.awayTeam.code}</span>
                </div>
              </div>

              {/* Prediction Banner */}
              <div className="mt-8">
                <div
                  className={`bg-gradient-to-r ${winnerBg} rounded-xl p-6 text-white shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium opacity-90">
                        Predicted Winner
                      </h3>
                      <div className="text-3xl font-bold mt-1 flex items-center">
                        <Trophy className="h-6 w-6 mr-2" />
                        {game.predictedWinner}
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-sm font-medium opacity-90">
                        Win Probability
                      </h3>
                      <div className="text-3xl font-bold mt-1">
                        {game.predictedWinner === game.homeTeam.code
                          ? game.homeWinProbability
                          : game.awayWinProbability}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="px-6 md:px-8 mb-6">
              <AiInsightWrapper game={game} />
            </div>

            {/* Stats Comparison */}
            <div className="px-6 md:px-8 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Head-to-Head Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="py-2">
                        <td className="py-3 text-center font-medium">
                          {game.homeTeam.name}
                        </td>
                        <td className="py-3 text-center text-sm text-gray-500">
                          Team
                        </td>
                        <td className="py-3 text-center font-medium">
                          {game.awayTeam.name}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <td className="py-3 text-center">
                          {game.homeWinProbability}%
                        </td>
                        <td className="py-3 text-center text-sm text-gray-500">
                          Win Probability
                        </td>
                        <td className="py-3 text-center">
                          {game.awayWinProbability}%
                        </td>
                      </tr>
                      <tr className="py-2">
                        <td className="py-3 text-center">4.5</td>
                        <td className="py-3 text-center text-sm text-gray-500">
                          Predicted Runs
                        </td>
                        <td className="py-3 text-center">3.2</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4 px-6 md:px-8">
              Total Predicted Score: 7.7 Runs
            </div>

            <Separator className="my-8" />

            <div className="text-center text-xs text-gray-400 pb-6 px-6 md:px-8">
              Last updated: {new Date().toLocaleString()} • Predictions provided
              by AI
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
