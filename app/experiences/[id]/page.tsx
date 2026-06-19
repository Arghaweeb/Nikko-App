import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { experiences } from "@/lib/data";
import { ScenicArt } from "@/components/ScenicArt";
import { ThemeChip } from "@/components/ui";

export function generateStaticParams() {
  return experiences.map((experience) => ({ id: experience.id }));
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-8 py-6">
      <Link href="/experiences" className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100">
        <ArrowLeft size={15} /> Back
      </Link>

      <section className="card overflow-hidden">
        <div className="relative h-52 sm:h-64">
          <ScenicArt art={experience.art} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              {experience.themes.map((theme) => (
                <ThemeChip key={theme} theme={theme} />
              ))}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl">{experience.name.en}</h1>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-7">
          <p className="eyebrow">Coming soon</p>
          <p className="max-w-2xl text-[15px] leading-relaxed opacity-90">
            A full detail page for this experience is coming soon. For now, return to the experiences list to reserve
            it and earn eco points.
          </p>
          <div className="flex flex-wrap gap-3 text-sm opacity-80">
            <span>{experience.duration.en}</span>
            <span>JPY {experience.priceJpy.toLocaleString()}</span>
            <span>+{experience.ecoPoints} eco points</span>
          </div>
          <Link href="/experiences" className="btn btn-primary w-full sm:w-auto">
            Back to experiences
          </Link>
        </div>
      </section>
    </div>
  );
}
