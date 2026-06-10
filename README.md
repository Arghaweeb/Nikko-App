# Nikko Passport 🏔️⚡

A bilingual (EN / 日本語), mobile-first tourism super app prototype for Nikko City, Japan — built around Bitcoin Lightning payments, a local rewards currency (**Nikko Coin**), and a sustainability eco-score system.

> Demo prototype — no real funds move anywhere in this application.

## Features

- **Bitcoin Lightning wallet** — connect (Wallet of Satoshi, Phoenix, Alby, Breez, Blink), send/receive with QR invoices, confirmation screens, transaction history, BTC ↔ NKO ↔ JPY exchange reference
- **Nikko Coin** — earned through Lightning payments, hotel stays, restaurant visits; redeemable for discounts, tickets, and souvenirs
- **Eco Score** — log walking/cycling/transit activities, unlock badges, climb the leaderboard
- **Three tourism themes** — Nature & Outdoor / Heritage & Spiritual / Food & Local Lifestyle — switching themes re-ranks every recommendation and itinerary in the app
- **Hotel & restaurant discovery** — comparison table, sustainability ratings, reviews, external booking links (Official site, Booking.com, Rakuten Travel, Jalan)
- **Interactive salamander mascot** — greets, tips, and delivers notifications
- **Full EN/JA language switcher, light/dark mode**, all preferences persisted to localStorage

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
/app          Pages & routes (App Router)
/components   Reusable UI (Navbar, Mascot, ScenicArt, ui primitives)
/features     Reserved for future feature modules
/hooks        Custom React hooks (useLocalStorage)
/lib          App state provider, demo data, utilities
/locales      EN/JA translation dictionaries
/public       Static assets (favicon)
/services     Mock Lightning service, exchange rates
/styles       Global CSS & design tokens
/types        Shared TypeScript interfaces
```
