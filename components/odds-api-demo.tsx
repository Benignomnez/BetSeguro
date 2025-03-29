"use client";

import { useState, useEffect } from "react";
import { OddsApiClient, GameOdds, Sport } from "@/lib/api/odds-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronRight, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";

export default function OddsApiDemo() {
  const { t } = useLanguage();
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [games, setGames] = useState<GameOdds[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Initialize with a fake API key for demo purposes
  const client = new OddsApiClient("demo-api-key");

  // Fetch sports on mount
  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      try {
        // For demo, we'll use mock data instead of calling the actual API
        const mockSports: Sport[] = [
          {
            key: "baseball_mlb",
            group: "Baseball",
            title: "MLB",
            description: "US Baseball",
            active: true,
            has_outrights: false,
          },
          {
            key: "basketball_nba",
            group: "Basketball",
            title: "NBA",
            description: "US Basketball",
            active: true,
            has_outrights: false,
          },
          {
            key: "americanfootball_nfl",
            group: "American Football",
            title: "NFL",
            description: "US Football",
            active: true,
            has_outrights: false,
          },
        ];

        setSports(mockSports);
        setSelectedSport(mockSports[0].key);
      } catch (err) {
        setError("Failed to fetch sports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  // Fetch odds when a sport is selected
  useEffect(() => {
    if (selectedSport) {
      fetchOdds(selectedSport);
    }
  }, [selectedSport]);

  const fetchOdds = async (sportKey: string) => {
    setLoading(true);
    try {
      // For demo, we'll use mock data instead of calling the actual API
      const mockOdds: GameOdds[] = [
        {
          id: "1",
          sport_key: sportKey,
          commence_time: new Date(Date.now() + 86400000).toISOString(),
          home_team: "New York Mets",
          away_team: "Houston Astros",
          bookmakers: [
            {
              key: "fanduel",
              title: "FanDuel",
              last_update: new Date().toISOString(),
              markets: [
                {
                  key: "h2h",
                  outcomes: [
                    { name: "New York Mets", price: -220 },
                    { name: "Houston Astros", price: 180 },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "2",
          sport_key: sportKey,
          commence_time: new Date(Date.now() + 2 * 86400000).toISOString(),
          home_team: "Boston Red Sox",
          away_team: "Chicago Cubs",
          bookmakers: [
            {
              key: "draftkings",
              title: "DraftKings",
              last_update: new Date().toISOString(),
              markets: [
                {
                  key: "h2h",
                  outcomes: [
                    { name: "Boston Red Sox", price: -150 },
                    { name: "Chicago Cubs", price: 130 },
                  ],
                },
              ],
            },
          ],
        },
      ];

      setGames(mockOdds);
      setError("");
    } catch (err) {
      setError("Failed to fetch odds");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // American odds to probability conversion
  const oddsToProb = (americanOdds: number): number => {
    if (americanOdds < 0) {
      return (Math.abs(americanOdds) / (Math.abs(americanOdds) + 100)) * 100;
    } else {
      return (100 / (americanOdds + 100)) * 100;
    }
  };

  // Format date for display
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

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            <AnimatedText text="The Odds API Integration Demo" element="span" />
          </h3>
          <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">
            <AnimatedText text="Live Demo" element="span" />
          </Badge>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-indigo-400/30">
            <div className="text-white font-medium mb-3">
              <AnimatedText text="Select a Sport" element="h4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {sports.map((sport) => (
                <Button
                  key={sport.key}
                  variant={selectedSport === sport.key ? "default" : "outline"}
                  className={
                    selectedSport === sport.key
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white/20 text-white hover:bg-white/30 border-indigo-300/30"
                  }
                  onClick={() => setSelectedSport(sport.key)}
                >
                  {sport.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
              <div className="font-medium text-blue-800">
                <AnimatedText
                  text={`${
                    selectedSport.split("_")[1]?.toUpperCase() || ""
                  } Upcoming Games`}
                  element="span"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                onClick={() => fetchOdds(selectedSport)}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                <AnimatedText text="Refresh" element="span" />
              </Button>
            </div>

            {error ? (
              <div className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-gray-700">{error}</p>
              </div>
            ) : (
              <div className="divide-y">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">
                        {formatDate(game.commence_time)}
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {game.bookmakers[0]?.title || "Unknown Bookmaker"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium">{game.home_team}</div>
                        <div className="font-medium">{game.away_team}</div>
                      </div>

                      <div className="space-y-1 text-right">
                        {game.bookmakers[0]?.markets[0]?.outcomes.map(
                          (outcome, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="text-sm font-medium">
                                {outcome.price > 0
                                  ? `+${outcome.price}`
                                  : outcome.price}
                              </div>
                              <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                                {oddsToProb(outcome.price).toFixed(0)}%
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {games.length === 0 && !loading && !error && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No games available</p>
              </div>
            )}

            {loading && (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
                <p className="text-gray-700">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
