"use client";

import { MoviesService } from "@/services/movies.service";
import { SeriesService } from "@/services/series.service";
import { Genre } from "@/types/genre";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const HeroCard = () => {
  const [mediaType, setMediaType] = useState<"movie" | "series">("movie");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number>();

  const [recommendation, setRecommendation] = useState<any>(null);

  useEffect(() => {
    loadGenres();
  }, [mediaType]);

  async function loadGenres() {
    try {
      const data =
        mediaType === "movie"
          ? await MoviesService.getGenres()
          : await SeriesService.getGenres();

      setGenres(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRecommend() {
    if (!selectedGenre) return;

    try {
      const response =
        mediaType === "movie"
          ? await MoviesService.searchByGenre(selectedGenre)
          : await SeriesService.searchByGenre(selectedGenre);

      const results = response.data;

      if (!results.length) {
        setRecommendation(null);
        return;
      }
      //Mover luego al backend
      const randomIndex = Math.floor(Math.random() * results.length);

      setRecommendation(results[randomIndex]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
              onChange={(e) =>
                setMediaType(e.target.value as "movie" | "series")
              }
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="movie">Película</option>
              <option value="series">Serie</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Género</label>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="">Seleccioná un género</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRecommend}
            className=" w-full rounded-xl bg-yellow-600 py-3 font-semibold transition duration-300 hover:bg-yellow-500 hover:scale-110 cursor-pointer"
          >
            Recomendar
          </button>
        </div>
      </div>

      {recommendation && (
        <div className="mt-6 w-full max-w-md rounded-2xl bg-black/40 p-4">
          <Image
            alt={recommendation.title}
            src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
            width={300}
            height={450}
            className="mx-auto"
          />

          <h3 className="mt-4 text-lg font-bold">
            {recommendation.title ?? recommendation.original_title}
          </h3>

          <p className="mt-2 text-sm text-gray-300">
            {recommendation.overview}
          </p>

          <p className="mt-3 text-yellow-400 ">
            <FaStar /> {recommendation.vote_average}
          </p>
        </div>
      )}
    </>
  );
};

export default HeroCard;
