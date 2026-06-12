"use client";

import { MoviesService } from "@/services/movies.service";
import { SeriesService } from "@/services/series.service";
import { Genre } from "@/types/genre";
import { useState } from "react";

const HeroCard = () => {
  const [mediaType, setMediaType] = useState<"movie" | "series">("movie");
  const [genres, setGenres] = useState<Genre[]>([]);

  async function loadGenres() {
    try {
      const data =
        mediaType == "movie"
          ? await MoviesService.getGenres()
          : await SeriesService.getGenres();

      setGenres(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/20 p-6 shadow-xl">
      <h2 className="mb-5 text-center text-lg font-semibold ">
        ¡Contanos tus gustos!
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            ¿Qué querés ver?
          </label>

          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as "movie" | "series")}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-red-500"
          >
            <option value="movie">Película</option>
            <option value="series">Serie</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Género</label>

          <select className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-red-500">
            <option>Acción</option>
            <option>Comedia</option>
            <option>Terror</option>
            <option>Ciencia ficción</option>
          </select>
        </div>

        <button className=" w-full rounded-xl bg-yellow-600 py-3 font-semibold transition duration-300 hover:bg-yellow-500 hover:scale-110">
          Recomendar
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
