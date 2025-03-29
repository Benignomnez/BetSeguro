import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UpcomingGames from "@/components/upcoming-games";

export const metadata = {
  title: "All Game Predictions | BetSeguro",
  description: "View all upcoming sports game predictions with AI insights",
};

export default function PredictionsPage() {
  return (
    <div className="container max-w-5xl py-8 md:py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
        Upcoming Game Predictions
      </h1>

      <p className="text-gray-600 mb-8 max-w-3xl">
        Browse all upcoming games across different sports with our AI-powered
        predictions. Click on any game to see detailed analysis and insights.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <UpcomingGames />
      </div>
    </div>
  );
}
