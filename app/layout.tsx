import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { validateEnvVars } from "@/lib/env-check";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Validate environment variables at build/startup time
try {
  validateEnvVars();
} catch (error) {
  console.error("Environment validation failed:", error);
}

// Viewport configuration (separate from metadata as required in Next.js 15)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | BetSeguro",
    default: "BetSeguro - AI-Powered Sports Predictions",
  },
  description:
    "Make smarter sports bets with BetSeguro's AI-powered predictions for MLB, NBA, and NHL games. Real-time odds and detailed analysis.",
  keywords: [
    "sports predictions",
    "sports betting",
    "AI predictions",
    "MLB predictions",
    "NBA predictions",
    "NHL predictions",
    "betting odds",
    "sports analytics",
  ],
  authors: [{ name: "BetSeguro" }],
  creator: "BetSeguro",
  publisher: "BetSeguro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  openGraph: {
    title: "BetSeguro - AI-Powered Sports Predictions",
    description:
      "Make smarter sports bets with BetSeguro's AI-powered predictions for MLB, NBA, and NHL games.",
    url: "/",
    siteName: "BetSeguro",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BetSeguro - AI-Powered Sports Predictions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetSeguro - AI-Powered Sports Predictions",
    description:
      "Make smarter sports bets with BetSeguro's AI-powered predictions for MLB, NBA, and NHL games.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
