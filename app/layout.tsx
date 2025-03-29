import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { validateEnvVars } from "@/lib/env-check";
import LanguageProvider from "@/components/language-provider";

const inter = Inter({ subsets: ["latin"] });

// Validate environment variables during server component initialization
if (process.env.NODE_ENV === "production") {
  validateEnvVars();
}

export const metadata = {
  title: "BetSeguro - Sports Prediction Platform",
  description: "AI-powered sports prediction platform for MLB games",
  generator: "v0.dev",
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

import "./globals.css";
