import { notFound } from "next/navigation";
import { restaurants } from "@/lib/data";
import { RestaurantDetailClient } from "./RestaurantDetailClient";

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ id: restaurant.id }));
}

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetailClient id={id} />;
}
