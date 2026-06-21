"use client";

import { MoviesService } from "@/services/movies.service";
import { SeriesService } from "@/services/series.service";
import { Genre } from "@/types/genre";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
      const resultResponse =
        mediaType === "movie"
          ? await MoviesService.discoverByGenre(selectedGenre)
          : await SeriesService.discoverByGenre(selectedGenre);

      setRecommendation(resultResponse);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`w-full mt-10 flex gap-8 transition-all duration-500 mb-20 ${
        recommendation
          ? "flex-col md:flex-row md:-translate-x-2 justify-center items-start"
          : "justify-center"
      }`}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/20 p-6 shadow-xl">
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
            className=" w-full rounded-xl bg-yellow-600 py-3 font-semibold transition duration-300 hover:bg-yellow-500 hover:scale-105 cursor-pointer"
          >
            Recomendar
          </button>
        </div>
      </div>

      {recommendation && (
        <div className=" w-full max-w-3xl rounded-2xl bg-black/40 p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Image
              alt="Poster de la pelicula o serie"
              src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
              width={300}
              height={450}
              className="mx-auto rounded-xl md:mx-0 md:w-48"
            />

            <div className="flex flex-col">
              <h3 className="text-lg font-bold">
                {mediaType === "movie"
                  ? (recommendation.title ?? recommendation.original_title)
                  : (recommendation.name ?? recommendation.original_name)}
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                {recommendation.overview}
              </p>

              <div className="mt-4 flex items-center gap-1 text-yellow-400">
                <FaStar />
                <span>{recommendation.vote_average.toFixed(1)}</span>
              </div>
              <Link
              href={`/${mediaType}/${recommendation.id}`}
              className="mt-auto self-end rounded-xl bg-yellow-600 px-3 py-3 font-semibold transition duration-300 hover:bg-yellow-400"
            >
              Ver detalles
            </Link>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
