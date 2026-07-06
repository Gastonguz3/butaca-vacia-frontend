"use client";

import Link from "next/link";
import Image from "next/image";
import { Series } from "@/types/series/series";
import { useEffect, useState } from "react";
import { SeriesService } from "@/services/series.service";

type ListRecommendationSeriesProps = {
  id: number;
};

const ListRecommendationSeries = ({ id }: ListRecommendationSeriesProps) => {
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  useEffect(() => {
    loadSeries();
  }, [id]);

  async function loadSeries() {
    const response = await SeriesService.getRecommendations(id);
    setSeriesList(response);
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4 mt-5">
        <h2 className="text-xl md:text-2xl font-bold ">Series Similares</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {seriesList.map((serie) => (
          <div
            key={serie.id}
            className="rounded-xl bg-black/30 border border-yellow-600/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500 cursor-pointer"
          >
            <div className="overflow-hidden">
              <Link href={`/series/${serie.id}`}>
                <Image
                  alt={serie.name}
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  width={300}
                  height={300}
                  className="w-full transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <div className="p-2">
              <p className="line-clamp-2 text-md font-medium text-center">
                {serie.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListRecommendationSeries;
