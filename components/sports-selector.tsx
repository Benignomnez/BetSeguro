"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SportsSelectorProps {
  onSelectSport: (sport: string) => void
  defaultSport?: string
}

// List of supported sports from the Odds API - only include sports that are currently in season
const supportedSports = [
  { key: "all", name: "All Sports" },
  { key: "baseball_mlb", name: "MLB" },
  { key: "basketball_nba", name: "NBA" },
  { key: "icehockey_nhl", name: "NHL" },
  // { key: 'football_nfl', name: 'NFL' }, - Commented out as it's not currently in season
]

export default function SportsSelector({ onSelectSport, defaultSport = "all" }: SportsSelectorProps) {
  const [selectedSport, setSelectedSport] = useState(defaultSport)

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport)
    onSelectSport(sport)
  }

  return (
    <Tabs defaultValue={selectedSport} className="w-full">
      <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${supportedSports.length}, minmax(0, 1fr))` }}>
        {supportedSports.map((sport) => (
          <TabsTrigger key={sport.key} value={sport.key} onClick={() => handleSportChange(sport.key)}>
            {sport.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

