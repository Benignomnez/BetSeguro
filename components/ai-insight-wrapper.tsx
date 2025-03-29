"use client";

import dynamic from "next/dynamic";
import type { Game } from "@/lib/odds-api";
import StaticAiInsight from "@/components/static-ai-insight";
import { useState, useEffect } from "react";

// Dynamically import the AI insight component with no SSR
const DynamicAiInsight = dynamic(() => import("@/components/ai-insight"), {
  ssr: false,
  loading: () => <StaticAiInsight game={null as any} />,
});

export default function AiInsightWrapper({ game }: { game: Game }) {
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    // If we've had SSL issues in the past, use static insights
    const hasSSLIssues = localStorage.getItem("hasSSLIssues") === "true";
    if (hasSSLIssues) {
      setUseStatic(true);
    }

    // Listen for ssl errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes("SSL") ||
        event.error?.message?.includes("TLS") ||
        event.error?.message?.includes("fetch failed")
      ) {
        console.log("SSL error detected, switching to static insights");
        localStorage.setItem("hasSSLIssues", "true");
        setUseStatic(true);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  // In development, use the static insight to avoid API calls
  if (process.env.NODE_ENV === "development" || useStatic) {
    return <StaticAiInsight game={game} />;
  }

  // In production, try the dynamic insight first
  // with error handling in the component itself
  return <DynamicAiInsight game={game} />;
}
