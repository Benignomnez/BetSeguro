"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";

export interface BreadcrumbItem {
  label: string;
  href: string;
  translationKey?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600"
          >
            <Home className="h-4 w-4 mr-2" />
            <AnimatedText text={t("breadcrumbs.home")} element="span" />
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href={item.href}
                className={`ml-1 md:ml-2 text-sm ${
                  index === items.length - 1
                    ? "font-medium text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                <AnimatedText
                  text={
                    item.translationKey ? t(item.translationKey) : item.label
                  }
                  element="span"
                />
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
