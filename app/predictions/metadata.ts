import { Metadata } from "next";
import { sharedViewport } from "@/lib/metadata-utils";

// Separate viewport export (required in Next.js 15)
export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: "Sports Predictions - BetSeguro",
  description:
    "Browse AI-powered predictions for upcoming sports games across MLB, NBA, and NHL. Get detailed analysis and insights to make smarter betting decisions.",
  keywords:
    "sports predictions, betting predictions, AI predictions, MLB predictions, NBA predictions, NHL predictions, betting insights",
  openGraph: {
    title: "AI-Powered Sports Predictions - BetSeguro",
    description:
      "Browse AI-powered predictions for upcoming sports games across MLB, NBA, and NHL. Get detailed analysis and insights to make smarter betting decisions.",
    url: "https://betseguro.com/predictions",
    siteName: "BetSeguro",
    locale: "en_US",
    type: "website",
  },
};

export default metadata;
