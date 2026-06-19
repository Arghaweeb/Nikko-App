import { LoaderCircle } from "lucide-react";
import { SalamanderFigure } from "@/components/Mascot";

export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[54vh] max-w-md flex-col items-center justify-center text-center" role="status">
      <div className="relative mb-4">
        <div className="rounded-full bg-forest-50 p-4 shadow-card dark:bg-charcoal-900">
          <SalamanderFigure size={82} walking />
        </div>
        <LoaderCircle
          size={30}
          className="absolute -bottom-1 -right-1 animate-spin rounded-full bg-white p-1 text-forest-700 shadow-card dark:bg-charcoal-800 dark:text-gold-300"
        />
      </div>
      <p className="eyebrow">Loading</p>
      <p className="mt-2 text-sm text-ink-soft dark:text-beige-200/70">Preparing your next Nikko stop...</p>
      <span className="sr-only">Loading page</span>
    </section>
  );
}
