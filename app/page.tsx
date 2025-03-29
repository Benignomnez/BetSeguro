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
import LanguageSwitcher from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-20 items-center">
          <div className="mr-6 flex">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-bold text-xl text-gray-900">BetSeguro</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center space-x-4 justify-end">
            <nav className="hidden md:flex items-center space-x-6 mr-4">
              <Link
                href="/predictions"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                {t("navigation.predictions")}
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                {t("navigation.pricing")}
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                {t("navigation.faq")}
              </Link>
              <LanguageSwitcher />
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow h-11 px-5 font-medium">
              {t("navigation.signIn")}
            </Button>
          </div>
        </div>
      </header>
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
                  <Button className="bg-white text-blue-800 hover:bg-gray-100 h-12 px-6 font-semibold shadow-lg">
                    {t("hero.getStarted")}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-blue-700 border-white text-white hover:bg-blue-600 hover:border-white h-12 px-6 font-semibold shadow-lg"
                  >
                    {t("hero.howItWorks")}
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
                <Button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold h-12 px-8 shadow-lg">
                  {t("cta.button")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-2xl">BetSeguro</span>
              </Link>
              <p className="text-gray-600 mb-6 max-w-md text-base">
                {t("footer.description")}
              </p>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                {t("footer.sections.product.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.product.links.features")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.product.links.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.product.links.api")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.product.links.integrations")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                {t("footer.sections.resources.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.resources.links.documentation")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.resources.links.guides")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.resources.links.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {t("footer.sections.resources.links.support")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} BetSeguro. {t("footer.legal.rights")}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("footer.legal.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
