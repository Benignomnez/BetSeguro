import { Metadata } from "next";
import { sharedViewport } from "@/lib/metadata-utils";

// Separate viewport export (required in Next.js 15)
export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: "Pricing Plans - BetSeguro",
  description:
    "Choose from our range of affordable pricing plans for sports predictions. Get access to AI-powered insights for Baseball, Basketball, and Hockey.",
  keywords:
    "sports betting, predictions, pricing plans, baseball odds, basketball odds, hockey odds, betting insights",
  openGraph: {
    title: "Pricing Plans - BetSeguro",
    description:
      "Choose from our range of affordable pricing plans for sports predictions. Get access to AI-powered insights for Baseball, Basketball, and Hockey.",
    url: "https://betseguro.com/pricing",
    siteName: "BetSeguro",
    locale: "en_US",
    type: "website",
  },
};
