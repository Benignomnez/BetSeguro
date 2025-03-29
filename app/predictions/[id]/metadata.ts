import { Metadata } from "next";
import { sharedViewport } from "@/lib/metadata-utils";

// Separate viewport export (required in Next.js 15)
export const viewport = sharedViewport;

// Dynamic metadata is generated in the page component
// This provides default values
export const metadata: Metadata = {
  title: "Game Prediction - BetSeguro",
  description:
    "Detailed AI-powered prediction for this sports match with win probabilities, risk assessment, and betting insights.",
  keywords:
    "game prediction, sports prediction, betting odds, win probability, AI insights, sports analysis, BetSeguro",
  openGraph: {
    title: "Game Prediction - BetSeguro",
    description:
      "Detailed AI-powered prediction for this sports match with win probabilities, risk assessment, and betting insights.",
    siteName: "BetSeguro",
    locale: "en_US",
    type: "website",
  },
};
