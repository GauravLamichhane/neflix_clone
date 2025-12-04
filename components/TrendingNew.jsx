"use client";
import { useState, useEffect } from "react";
import CardSkeleton from "./CardSkeleton";

const cards = [
  { title: "Stranger Things", src: "/stranger.webp" },
  { title: "WWE Survivor Series", src: "/wwe.webp" },
  { title: "Jolly LLB 3", src: "/jolly.webp" },
  { title: "Delhi Crime", src: "/delhi.webp" },
  { title: "Stranger Things 2", src: "/stranger.webp" },
  { title: "WWE Raw", src: "/wwe.webp" },
  { title: "Jolly LLB 2", src: "/jolly.webp" },
  { title: "Delhi Crime 2", src: "/delhi.webp" },
  { title: "Stranger Things 3", src: "/stranger.webp" },
  { title: "WWE Smackdown", src: "/wwe.webp" },
];

const cardClass =
  "group relative min-w-[calc(33.333%-11px)] w-[calc(33.333%-11px)] sm:min-w-[180px] sm:w-[180px] md:min-w-[200px] md:w-[200px] lg:w-[calc(18%-13px)] overflow-hidden rounded-xl bg-gray-900 aspect-[2/3] transition duration-300 hover:-translate-y-1 shrink-0";
const imgClass =
  "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105";

export default function TrendingNew() {
  const [loading, setLoading] = useState(true); //start in loading state
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate data fetching with a delay
    const timer = setTimeout(() => {
      setData(cards); //load the real data
      setLoading(false); // turn off loading state
    }, 1500); // 1.5 second delay to show skeleton

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-black py-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <div className="flex gap-4 overflow-x-auto scroll-smooth">
          {loading
            ? Array(10)
                .fill(0)
                .map((_, i) => <CardSkeleton key={i} />)
            : data.map((card) => (
                <div key={card.title} className={cardClass}>
                  <img src={card.src} alt={card.title} className={imgClass} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
