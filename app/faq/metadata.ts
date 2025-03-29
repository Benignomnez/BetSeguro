import { Metadata } from "next";
import { sharedViewport } from "@/lib/metadata-utils";

// Separate viewport export (required in Next.js 15)
export const viewport = sharedViewport;

export const metadata: Metadata = {
  title: "Frequently Asked Questions - BetSeguro",
  description:
    "Find answers to common questions about BetSeguro's sports prediction platform, pricing plans, and how our AI-powered insights work.",
  keywords:
    "BetSeguro FAQ, sports predictions help, betting predictions support, AI insights questions, pricing FAQ",
  openGraph: {
    title: "Frequently Asked Questions - BetSeguro",
    description:
      "Find answers to common questions about BetSeguro's sports prediction platform, pricing plans, and how our AI-powered insights work.",
    url: "https://betseguro.com/faq",
    siteName: "BetSeguro",
    locale: "en_US",
    type: "website",
  },
};

export default metadata;
