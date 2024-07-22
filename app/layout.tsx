import type { Metadata } from "next";
import "./globals.css";
import { Poppins as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { MenuBar } from "@/components/menu-bar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "400"],
});

export const metadata: Metadata = {
  title: "CoinPulse | Crypto Insights Provider",
  description: "A cryto currency insights provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
