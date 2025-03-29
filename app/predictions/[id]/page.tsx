import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Percent,
  Calendar,
  Trophy,
  Timer,
  LineChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGameById } from "@/app/actions";
import { notFound } from "next/navigation";
import AiInsightWrapper from "@/components/ai-insight-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ClientImage from "@/components/client-image";

interface GamePredictionPageProps {
  params: {
    id: string;
  };
}

export default async function GamePredictionPage({
  params,
}: GamePredictionPageProps) {
  const id = await Promise.resolve(params.id);

  try {
    const game = await getGameById(id);

    if (!game) {
      notFound();
    }

    // Determine the dynamic classes for risk level
    const riskLevelClasses = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    };

    // Determine winner background
    const winnerBg =
      game.predictedWinner === game.homeTeam.code
        ? "from-blue-600 to-blue-700"
        : "from-red-600 to-red-700";

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all games
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Game Prediction
              </h1>
              <Badge
                className={
                  riskLevelClasses[
                    game.riskLevel as keyof typeof riskLevelClasses
                  ]
                }
              >
                {game.riskLevel} Risk
              </Badge>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {new Date(game.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                •{" "}
              </span>
              <Timer className="h-4 w-4 mx-1" />
              <span>{game.time} • </span>
              <span className="ml-1">{game.sportTitle}</span>
            </div>

            {/* Teams Comparison */}
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
          <div className="mb-6">
            <AiInsightWrapper game={game} />
          </div>

          {/* Stats Comparison */}
          <Card className="mb-6">
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

          <div className="text-center text-sm text-gray-500 mt-4">
            Total Predicted Score: 7.7 Runs
          </div>

          <Separator className="my-8" />

          <div className="text-center text-xs text-gray-400">
            Last updated: {new Date().toLocaleString()} • Predictions provided
            by AI
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading game prediction page:", error);
    notFound();
  }
}
