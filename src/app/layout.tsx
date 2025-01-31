import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "2048",
  description: "This is 2048 Game",
};

type GameProviderProps = {
  children: ReactNode;
};

const GameProviderNoSSR = dynamic<GameProviderProps>(
  () => import("@/contexts/GameProvider").then((mod) => mod.GameProvider),
  {
    ssr: false,
  },
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameProviderNoSSR>{children}</GameProviderNoSSR>
      </body>
    </html>
  );
}
