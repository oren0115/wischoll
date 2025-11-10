import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { categories } from "@/data/categories";

const DUPLICATES = 3;

export function Categories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(categories.length);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const items = useMemo(
    () => Array.from({ length: DUPLICATES }, () => categories).flat(),
    []
  );

  const indexRef = useRef(currentIndex);
  const baseLength = categories.length;

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(4);
      } else if (width >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  useEffect(() => {
    indexRef.current = baseLength;
    setCurrentIndex(baseLength);
    setIsTransitioning(false);
  }, [itemsPerView, baseLength]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    const current = indexRef.current;

    // Jump tanpa transisi ke posisi equivalent di set tengah
    if (current >= baseLength * 2) {
      // Sudah di ujung kanan, jump ke posisi sama di set tengah
      const resetIndex = current - baseLength;
      setCurrentIndex(resetIndex);
      indexRef.current = resetIndex;
    } else if (current <= 0) {
      // Sudah di ujung kiri, jump ke posisi sama di set tengah
      const resetIndex = current + baseLength;
      setCurrentIndex(resetIndex);
      indexRef.current = resetIndex;
    }
  };

  const slide = (direction: "prev" | "next") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      direction === "next" ? prev + itemsPerView : prev - itemsPerView
    );
  };

  const translatePercentage = -(100 / itemsPerView) * currentIndex;

  return (
    <section className="w-full bg-white pb-14 pt-8">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">
              categories
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Choose favourite course from top categories
            </h2>
          </div>
          <button className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500">
            See all
          </button>
        </header>

        <div className="relative">
          <div className="overflow-hidden pb-4">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(${translatePercentage}%)`,
                transition: isTransitioning ? "transform 500ms ease" : "none",
              }}
              className="flex gap-5">
              {items.map((category, index) => (
                <article
                  key={`${category.name}-${index}`}
                  className="group relative overflow-hidden rounded-3xl bg-slate-900 shadow-lg"
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 "
                  />
                  <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">
                        {category.name}
                      </h3>
                      {/* <button className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-emerald-500 hover:text-white">
                        <ChevronRightIcon className="h-5 w-5" />
                      </button> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-0 hidden h-full items-center justify-between px-4 lg:flex">
              <button
                type="button"
                onClick={() => slide("prev")}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg transition hover:bg-emerald-500 hover:text-white cursor-pointer">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => slide("next")}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg transition hover:bg-emerald-500 hover:text-white cursor-pointer">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
