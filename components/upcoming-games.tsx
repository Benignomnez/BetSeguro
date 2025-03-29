"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUpcomingGames } from "@/app/actions";
import type { Game } from "@/lib/odds-api";
import { Skeleton } from "@/components/ui/skeleton";
import SportsSelector from "./sports-selector";
import ClientImage from "@/components/client-image";

export default function UpcomingGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedSport, setSelectedSport] = useState("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        const sportParam = selectedSport === "all" ? undefined : selectedSport;
        const data = await getUpcomingGames(sportParam);
        setGames(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load games:", err);
        setError("Failed to load upcoming games. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, [selectedSport]);

  // Group games by date
  const gamesByDate = games.reduce((acc, game) => {
    const date = game.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(game);
    return acc;
  }, {} as Record<string, Game[]>);

  const dates = Object.keys(gamesByDate).sort();

  const filteredGames =
    selectedDate === "all" ? games : gamesByDate[selectedDate] || [];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <SportsSelector onSelectSport={setSelectedSport} defaultSport="all" />

      {loading ? (
        <LoadingGames />
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : games.length === 0 ? (
        <div className="w-full max-w-4xl mx-auto mt-8 text-center p-8">
          <p className="text-muted-foreground">
            No upcoming games found. Check back later!
          </p>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" onClick={() => setSelectedDate("all")}>
              All Games
            </TabsTrigger>
            {dates.slice(0, 3).map((date) => (
              <TabsTrigger
                key={date}
                value={date}
                onClick={() => setSelectedDate(date)}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedDate} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredGames.map((game) => (
                <Link
                  href={`/predictions/${game.id}`}
                  key={game.id}
                  className="block"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm text-muted-foreground">
                            {new Date(game.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            • {game.time}
                          </div>
                          <div className="text-sm font-medium">
                            {game.sportTitle}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-100">
                              <ClientImage
                                src={game.homeTeam.logo || "/placeholder.svg"}
                                alt={game.homeTeam.name}
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                            <div>
                              <div className="font-bold">
                                {game.homeTeam.code}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Win prob: {game.homeWinProbability}%
                              </div>
                            </div>
                          </div>

                          <div className="text-lg font-bold">vs</div>

                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold text-right">
                                {game.awayTeam.code}
                              </div>
                              <div className="text-sm text-muted-foreground text-right">
                                Win prob: {game.awayWinProbability}%
                              </div>
                            </div>
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-100">
                              <ClientImage
                                src={game.awayTeam.logo || "/placeholder.svg"}
                                alt={game.awayTeam.name}
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-3 text-center font-bold text-white ${
                          game.predictedWinner === game.homeTeam.code
                            ? "bg-red-600"
                            : "bg-blue-600"
                        }`}
                      >
                        Prediction: {game.predictedWinner}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function LoadingGames() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-12 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <Skeleton className="h-6 w-6" />

                  <div className="flex items-center gap-3">
                    <div>
                      <Skeleton className="h-5 w-12 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
