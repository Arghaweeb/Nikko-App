import { notFound } from "next/navigation";
import { attractions } from "@/lib/data";
import { AttractionDetailClient } from "./AttractionDetailClient";

export function generateStaticParams() {
  return attractions.map((attraction) => ({ id: attraction.id }));
}

export default async function AttractionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const attraction = attractions.find((item) => item.id === id);

  if (!attraction) {
    notFound();
  }

  return <AttractionDetailClient id={id} />;
}
