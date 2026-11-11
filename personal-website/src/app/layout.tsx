import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atharva Patil",
  description: "Atharva's personal website",
  themeColor: "#d6dbdc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="site">
          <SiteHeader />
          <div className="page">{children}</div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
