import Link from "next/link";
import { Home } from "lucide-react";
import { SalamanderFigure } from "@/components/Mascot";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-xl flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-forest-50 p-4 shadow-card dark:bg-charcoal-900">
        <SalamanderFigure size={104} wave />
      </div>
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        This trail is still being mapped
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft dark:text-beige-200/70">
        The page you are looking for is not available yet. Head back home and keep exploring Nikko from there.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        <Home size={16} />
        Back to home
      </Link>
    </section>
  );
}
