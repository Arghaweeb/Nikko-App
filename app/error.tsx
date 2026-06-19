"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { SalamanderFigure } from "@/components/Mascot";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[62vh] max-w-xl flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-rose-50 p-4 shadow-card dark:bg-rose-950/30">
        <SalamanderFigure size={104} wave />
      </div>
      <p className="eyebrow inline-flex items-center justify-center gap-1.5">
        <AlertTriangle size={13} />
        Something went wrong
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        The route hit a rough patch
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft dark:text-beige-200/70">
        Try reloading this stop. If it keeps happening, return home and continue from the main map.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={reset} className="btn btn-primary">
          <RotateCcw size={16} />
          Try again
        </button>
        <Link href="/" className="btn btn-ghost">
          <Home size={16} />
          Back to home
        </Link>
      </div>
    </section>
  );
}
