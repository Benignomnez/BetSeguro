"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Database,
  LineChart,
  BarChart,
  RefreshCw,
  ChevronRight,
  Award,
  Check,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedText from "@/components/animated-text";
import OddsApiDemo from "@/components/odds-api-demo";
import AIInsightDemo from "@/components/ai-insight-demo";
import PredictionCardDemo from "@/components/prediction-card-demo";
import SystemStatus from "@/components/system-status";

export default function HowItWorksPage() {
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
                  href: "/how-it-works",
                  translationKey: "navigation.howItWorks",
                },
              ]}
            />
          </div>

          <AnimatedText
            text={t("howItWorks.title")}
            element="h1"
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6"
          />

          <AnimatedText
            text={t("howItWorks.subtitle")}
            element="p"
            className="text-gray-600 mb-8 md:mb-12 max-w-3xl text-base md:text-lg"
          />

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-16 mb-12 md:mb-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 md:h-7 md:w-7 text-blue-700" />
                </div>
                <AnimatedText
                  text={t("howItWorks.steps.step1.title")}
                  element="h2"
                  className="text-2xl font-bold text-gray-900 mb-4"
                />
                <AnimatedText
                  text={t("howItWorks.steps.step1.description")}
                  className="text-gray-600 mb-4"
                />
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step1.features.feature1")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step1.features.feature2")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step1.features.feature3")}
                      className="text-gray-600"
                    />
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
                <OddsApiDemo />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="bg-indigo-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 md:h-7 md:w-7 text-indigo-700" />
                </div>
                <AnimatedText
                  text={t("howItWorks.steps.step2.title")}
                  element="h2"
                  className="text-2xl font-bold text-gray-900 mb-4"
                />
                <AnimatedText
                  text={t("howItWorks.steps.step2.description")}
                  className="text-gray-600 mb-4"
                />
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step2.features.feature1")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step2.features.feature2")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step2.features.feature3")}
                      className="text-gray-600"
                    />
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-2 md:order-1 bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
                <AIInsightDemo />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-green-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 md:h-7 md:w-7 text-green-700" />
                </div>
                <AnimatedText
                  text={t("howItWorks.steps.step3.title")}
                  element="h2"
                  className="text-2xl font-bold text-gray-900 mb-4"
                />
                <AnimatedText
                  text={t("howItWorks.steps.step3.description")}
                  className="text-gray-600 mb-4"
                />
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step3.features.feature1")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step3.features.feature2")}
                      className="text-gray-600"
                    />
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <AnimatedText
                      text={t("howItWorks.steps.step3.features.feature3")}
                      className="text-gray-600"
                    />
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
                <PredictionCardDemo />
              </div>
            </div>
          </div>

          {/* How Accurate? */}
          <div className="bg-blue-50 rounded-xl p-5 md:p-8 mb-12 md:mb-16 border border-blue-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              <AnimatedText
                text={t("howItWorks.accuracy.title")}
                element="span"
                className="inline"
              />
            </h2>
            <AnimatedText
              text={t("howItWorks.accuracy.description")}
              className="text-gray-600 mb-4 md:mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600">
                    <AnimatedText
                      text={t("howItWorks.accuracy.stats.high.value")}
                      element="span"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedText
                    text={t("howItWorks.accuracy.stats.high.label")}
                    className="text-sm md:text-base text-gray-600"
                  />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600">
                    <AnimatedText
                      text={t("howItWorks.accuracy.stats.medium.value")}
                      element="span"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedText
                    text={t("howItWorks.accuracy.stats.medium.label")}
                    className="text-sm md:text-base text-gray-600"
                  />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600">
                    <AnimatedText
                      text={t("howItWorks.accuracy.stats.low.value")}
                      element="span"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedText
                    text={t("howItWorks.accuracy.stats.low.label")}
                    className="text-sm md:text-base text-gray-600"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* System Status */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              <AnimatedText text="Live System Status" element="span" />
            </h2>
            <SystemStatus />
          </div>

          {/* Try It Now CTA */}
          <div className="text-center">
            <AnimatedText
              text={t("howItWorks.cta.title")}
              element="h2"
              className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4"
            />
            <AnimatedText
              text={t("howItWorks.cta.description")}
              className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto"
            />
            <Link
              href="/predictions"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              <AnimatedText text={t("howItWorks.cta.button")} element="span" />
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
