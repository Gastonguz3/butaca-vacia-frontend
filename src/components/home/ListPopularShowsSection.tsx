"use client";

import { MoviesService } from "@/services/movies.service";
import { SeriesService } from "@/services/series.service";
import { Movie } from "@/types/movies/movie";
import { Series } from "@/types/series/series";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const ListPopularShowsSection = () => {
  const [moviePage, setMoviePage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  useEffect(() => {
    loadMovies();
  }, [moviePage]);

  useEffect(() => {
    loadSeries();
  }, [seriesPage]);

  async function loadMovies() {
    const response = await MoviesService.getPopular(moviePage, 6);
    setMovieList(response.data);
  }

  async function loadSeries() {
    const response = await SeriesService.getPopular(seriesPage, 6);
    setSeriesList(response.data);
  }
  return (
    <section className="px-4 bg-yellow-700">
      {/* PELICULAS */}
      <div className="flex items-center justify-between mb-4 mt-5">
        <h2 className="text-xl md:text-2xl font-bold ">
          Peliculas Más Populares
        </h2>

        <div className="flex gap-4">
          {moviePage >= 2 && (
            <button
              onClick={() => setMoviePage((prev) => prev - 1)}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-black transition hover:scale-110 cursor-pointer"
            >
              <FaChevronLeft />
            </button>
          )}

          <button
            onClick={() => setMoviePage((prev) => prev + 1)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-black transition hover:scale-110 cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="rounded-xl bg-black/30 border border-yellow-600/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500 cursor-pointer"
          >
            <div className="overflow-hidden">
              <Link href={`/movie/${movie.id}`}>
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width={300}
                  height={300}
                  className="w-full transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <div className="p-2">
              <p className="line-clamp-2 text-md font-medium text-center">
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SERIE */}
      <div className="flex items-center justify-between mb-4 mt-5">
        <h2 className="text-xl md:text-2xl font-bold ">Series Más Populares</h2>

        <div className="flex gap-4">
          {seriesPage >= 2 && (
            <button
              onClick={() => setSeriesPage((prev) => prev - 1)}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-black transition hover:scale-110 cursor-pointer"
            >
              <FaChevronLeft />
            </button>
          )}

          <button
            onClick={() => setSeriesPage((prev) => prev + 1)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-black transition hover:scale-110 cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
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
                  width={200}
                  height={200}
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

export default ListPopularShowsSection;
