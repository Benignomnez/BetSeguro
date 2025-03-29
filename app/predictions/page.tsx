"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedText from "@/components/animated-text";
import UpcomingGames from "@/components/upcoming-games";
import { useLanguage } from "@/components/language-provider";

export default function PredictionsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-5xl py-8 md:py-12 px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <Breadcrumbs
              items={[
                {
                  href: "/predictions",
                  translationKey: "navigation.predictions",
                },
              ]}
            />
          </div>

          <div className="mb-8 md:mb-12">
            <AnimatedText
              text={t("navigation.predictions")}
              element="h1"
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            />
            <AnimatedText
              text="Browse all upcoming games across different sports with our AI-powered predictions. Click on any game to see detailed analysis and insights."
              element="p"
              className="text-lg text-gray-600 max-w-3xl"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <UpcomingGames />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
