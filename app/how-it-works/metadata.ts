import { Metadata } from "next";
import { sharedViewport } from "@/lib/metadata-utils";

// Separate viewport export (required in Next.js 15)
export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: "How It Works - BetSeguro",
  description:
    "Learn how BetSeguro generates accurate AI-powered sports predictions for Baseball, Basketball, and Hockey games.",
  keywords:
    "sports betting, predictions, AI technology, odds, machine learning, sports data, baseball, basketball, hockey",
};
