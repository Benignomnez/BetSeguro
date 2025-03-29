import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedText from "@/components/animated-text";
import { Mail } from "lucide-react";

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    {
      questionKey: "faqPage.questions.howWorks.question",
      answerKey: "faqPage.questions.howWorks.answer",
    },
    {
      questionKey: "faqPage.questions.supportedSports.question",
      answerKey: "faqPage.questions.supportedSports.answer",
    },
    {
      questionKey: "faqPage.questions.accuracy.question",
      answerKey: "faqPage.questions.accuracy.answer",
    },
    {
      questionKey: "faqPage.questions.updates.question",
      answerKey: "faqPage.questions.updates.answer",
    },
    {
      questionKey: "faqPage.questions.freeTrial.question",
      answerKey: "faqPage.questions.freeTrial.answer",
    },
    {
      questionKey: "faqPage.questions.cancelSubscription.question",
      answerKey: "faqPage.questions.cancelSubscription.answer",
    },
    {
      questionKey: "faqPage.questions.payment.question",
      answerKey: "faqPage.questions.payment.answer",
    },
    {
      questionKey: "faqPage.questions.support.question",
      answerKey: "faqPage.questions.support.answer",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <Breadcrumbs
              items={[
                {
                  href: "/faq",
                  translationKey: "navigation.faq",
                },
              ]}
            />
          </div>

          <div className="mb-8 md:mb-12 text-center">
            <AnimatedText
              text={t("faqPage.title")}
              element="h1"
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            />
            <AnimatedText
              text={t("faqPage.subtitle")}
              element="p"
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden px-0"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 bg-gray-50 border-t border-gray-100">
                  {t(faq.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-blue-50 border border-blue-100 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t("faqPage.contactSupport.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("faqPage.contactSupport.description")}
            </p>
            <Button asChild>
              <a
                href="mailto:support@betseguro.com"
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {t("faqPage.contactSupport.button")}
              </a>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
