import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { AppProvider } from "@/lib/providers";
import { BottomNav, TopNav } from "@/components/Navbar";
import { MascotAssistant } from "@/components/Mascot";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Display & body faces: Shippori Mincho (display serif) + Zen Kaku Gothic New (body).
            Loaded at runtime so offline builds still succeed; system JP stacks are the fallback. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <AppProvider>
          <TopNav />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:pb-12">{children}</main>
          <MascotAssistant />
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
