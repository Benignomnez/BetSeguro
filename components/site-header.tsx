"use client";

import Link from "next/link";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";

export default function SiteHeader() {
  const { t } = useLanguage();

  return (
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
              <AnimatedText text={t("navigation.predictions")} element="span" />
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <AnimatedText text={t("navigation.howItWorks")} element="span" />
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <AnimatedText text={t("navigation.pricing")} element="span" />
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <AnimatedText text={t("navigation.faq")} element="span" />
            </Link>
            <LanguageSwitcher />
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow h-11 px-5 font-medium">
            <AnimatedText text={t("navigation.signIn")} element="span" />
          </Button>
        </div>
      </div>
    </header>
  );
}
