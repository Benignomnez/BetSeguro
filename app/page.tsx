"use client";

import Link from "next/link";
import {
  BarChart3,
  Brain,
  ChevronRight,
  Clock,
  DollarSign,
  LineChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UpcomingGames from "@/components/upcoming-games";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex flex-col items-start gap-4 md:gap-6 md:w-1/2">
                <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 font-medium">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white drop-shadow-sm">
                  {t("hero.title")}
                </h1>
                <p className="max-w-[600px] text-white md:text-xl font-medium drop-shadow-sm">
                  {t("hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button
                    asChild
                    className="bg-white text-blue-800 hover:bg-gray-100 h-12 px-6 font-semibold shadow-lg"
                  >
                    <Link href="/predictions">{t("hero.getStarted")}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-blue-700 border-white text-white hover:bg-blue-600 hover:border-white h-12 px-6 font-semibold shadow-lg"
                  >
                    <Link href="/how-it-works">{t("hero.howItWorks")}</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 bg-blue-700/50 p-2 rounded-lg border border-blue-500/30">
                    <Clock className="h-5 w-5 text-blue-100" />
                    <span className="text-sm text-white font-semibold">
                      {t("hero.features.realTime")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-700/50 p-2 rounded-lg border border-blue-500/30">
                    <Brain className="h-5 w-5 text-blue-100" />
                    <span className="text-sm text-white font-semibold">
                      {t("hero.features.aiPowered")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center p-4">
                <div className="bg-white/20 backdrop-blur-sm p-2 md:p-4 rounded-2xl shadow-xl">
                  <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl p-6 border border-blue-400 shadow-inner">
                    <div className="flex justify-between items-center border-b border-blue-400/30 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-6 w-6 text-white" />
                        <span className="font-bold text-white text-lg">
                          {t("mlbCard.title")}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium">
                        {t("mlbCard.accurate")}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-blue-700/50 rounded-lg hover:bg-blue-700/70 transition-all cursor-pointer border border-blue-500/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-500 p-1.5 rounded-full">
                              <DollarSign className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-white text-sm font-medium">
                              NYM vs HOU
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className="mr-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-100 font-medium">
                              NYM 92%
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-blue-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 font-medium">
                {t("features.badge")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                {t("features.title")}
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t("features.cards.predictions.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.cards.predictions.description")}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-indigo-600 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
                  <Brain className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t("features.cards.insights.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.cards.insights.description")}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-purple-600 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-5">
                  <BarChart3 className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t("features.cards.statistics.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.cards.statistics.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 font-medium">
                {t("livePredictions.badge")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                {t("livePredictions.title")}
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                {t("livePredictions.description")}
              </p>
              <div className="flex items-center gap-2 text-blue-600 text-sm mt-2 bg-blue-50 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">
                  {t("livePredictions.updatedEvery")}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <UpcomingGames />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-indigo-700 to-blue-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-sm">
                  {t("cta.title")}
                </h2>
                <p className="text-indigo-100 mb-6 font-medium">
                  {t("cta.description")}
                </p>
              </div>
              <div>
                <Button
                  asChild
                  className="bg-white text-blue-700 hover:bg-gray-100 font-semibold h-12 px-8 shadow-lg"
                >
                  <Link href="/predictions">{t("cta.button")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
