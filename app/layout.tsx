import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
// @ts-ignore: side-effect import for global styles
import "../styles/globals.css";
import { AppProvider } from "@/lib/providers";
import { BottomNav, TopNav } from "@/components/Navbar";
import { MascotAssistant } from "@/components/Mascot";
import { PageMascot } from "@/components/PageMascot";
import { ChatWidget } from "@/components/ChatWidget";


const displayFont = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikko Passport — 日光パスポート",
  description:
    "Your gateway to Nikko: sustainable tourism, local rewards with Nikko Coin, and Bitcoin Lightning payments across the city.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e0c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <AppProvider>
          <TopNav />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 xl:pb-12">{children}</main>
          <MascotAssistant />
          <PageMascot />
          <ChatWidget />
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
