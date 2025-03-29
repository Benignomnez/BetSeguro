"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import {
  ChartBar,
  FileText,
  Languages,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function SiteFooter() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">BetSeguro</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t("footer.description")}
            </p>
          </div>

          {/* Product */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.sections.product.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ChartBar className="h-4 w-4" />
                  {t("footer.sections.product.links.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Languages className="h-4 w-4" />
                  {t("footer.sections.product.links.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {t("footer.sections.product.links.api")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.sections.resources.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t("footer.sections.resources.links.support")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <a
              href="mailto:support@betseguro.com"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              support@betseguro.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} BetSeguro. {t("footer.legal.rights")}
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              {t("footer.legal.terms")}
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              {t("footer.legal.privacy")}
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              {t("footer.legal.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
