import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainLayout from "@/components/navigation/MainLayout";

export const metadata: Metadata = {
  title: "Julian's Portfolio",
  description: "My personal portfolio showcasing my projects and skills.",
  authors: [{ name: "Julian Nott"}],
  category: "Portfolio",
  keywords: ["Portfolio", "Development", "Projects", "Skills"],
  creator: "Julian Nott",

};

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jetbrains.variable}  antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}


