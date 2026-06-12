import { notFound } from "next/navigation";
import { hotels } from "@/lib/data";
import { HotelDetailClient } from "./HotelDetailClient";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ id: hotel.id }));
}

export default async function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = hotels.find((item) => item.id === id);

  if (!hotel) {
    notFound();
  }

  return <HotelDetailClient id={id} />;
}
