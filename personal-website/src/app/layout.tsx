import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atharva Patil",
  description: "Atharva's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en mx-auto px-6 min-h-screen ">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
