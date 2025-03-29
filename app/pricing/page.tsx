"use client";

import Link from "next/link";
import { Check, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedText from "@/components/animated-text";
import SiteFooter from "@/components/site-footer";

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-6xl py-8 md:py-12 px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <Breadcrumbs
              items={[
                {
                  href: "/pricing",
                  translationKey: "navigation.pricing",
                },
              ]}
            />
          </div>

          <div className="mb-8 md:mb-12 text-center">
            <AnimatedText
              text={t("pricing.title")}
              element="h1"
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            />
            <AnimatedText
              text={t("pricing.subtitle")}
              element="p"
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Baseball Plan */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {t("pricing.labels.popular")}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("pricing.baseballPlan.title")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("pricing.baseballPlan.description")}
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="text-gray-400 text-lg line-through mr-2">
                    {t("pricing.baseballPlan.originalPrice")}
                  </span>
                  <span className="text-3xl font-bold">
                    {t("pricing.baseballPlan.price")}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {t("pricing.baseballPlan.perMonth")}
                  </span>
                </div>

                <Button className="w-full mb-6" size="lg">
                  {t("pricing.baseballPlan.button")}
                </Button>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.matchPoints")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.overUnder")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.winningTeam")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.aiInsights")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Basketball Plan */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <div className="p-6 relative">
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {t("pricing.labels.popular")}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("pricing.basketballPlan.title")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("pricing.basketballPlan.description")}
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="text-gray-400 text-lg line-through mr-2">
                    {t("pricing.basketballPlan.originalPrice")}
                  </span>
                  <span className="text-3xl font-bold">
                    {t("pricing.basketballPlan.price")}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {t("pricing.basketballPlan.perMonth")}
                  </span>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-6"
                  size="lg"
                >
                  {t("pricing.basketballPlan.button")}
                </Button>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.matchPoints")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.overUnder")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.winningTeam")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.quarterlyAnalysis")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hockey Plan */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {t("pricing.labels.popular")}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("pricing.hockeyPlan.title")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("pricing.hockeyPlan.description")}
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="text-gray-400 text-lg line-through mr-2">
                    {t("pricing.hockeyPlan.originalPrice")}
                  </span>
                  <span className="text-3xl font-bold">
                    {t("pricing.hockeyPlan.price")}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {t("pricing.hockeyPlan.perMonth")}
                  </span>
                </div>

                <Button className="w-full mb-6" size="lg">
                  {t("pricing.hockeyPlan.button")}
                </Button>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.matchPoints")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.overUnder")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.winningTeam")}</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t("pricing.features.periodBreakdown")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Sports Bundle */}
          <div className="mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Badge className="mb-2 bg-white/20 text-white hover:bg-white/25 border-none">
                      {t("pricing.labels.bestValue")}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {t("pricing.bundlePlan.title")}
                    </h2>
                    <p className="text-blue-100">
                      {t("pricing.bundlePlan.description")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-200 text-lg line-through">
                      {t("pricing.bundlePlan.originalPrice")}
                    </div>
                    <div className="text-4xl font-bold">
                      {t("pricing.bundlePlan.price")}
                    </div>
                    <div className="text-blue-200">
                      {t("pricing.bundlePlan.perMonth")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-300" />
                      {t("pricing.baseballPlan.title")}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {t("pricing.bundlePlan.includes.baseball")}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-300" />
                      {t("pricing.basketballPlan.title")}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {t("pricing.bundlePlan.includes.basketball")}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-300" />
                      {t("pricing.hockeyPlan.title")}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {t("pricing.bundlePlan.includes.hockey")}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 text-lg"
                    size="lg"
                  >
                    {t("pricing.bundlePlan.button")}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t("pricing.faq.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  {t("pricing.faq.switchPlans.question")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.faq.switchPlans.answer")}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  {t("pricing.faq.accuracy.question")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.faq.accuracy.answer")}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  {t("pricing.faq.freeTrial.question")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.faq.freeTrial.answer")}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  {t("pricing.faq.updates.question")}
                </h3>
                <p className="text-gray-600">
                  {t("pricing.faq.updates.answer")}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("pricing.cta.title")}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("pricing.cta.description")}
            </p>
            <Link
              href="/predictions"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t("pricing.cta.button")}
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
