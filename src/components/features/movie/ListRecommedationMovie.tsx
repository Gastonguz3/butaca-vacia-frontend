"use client";

import { MoviesService } from "@/services/movies.service";
import { Movie } from "@/types/movies/movie";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

type ListRecommendationMovieProps = {
  id: number;
};

const ListRecommendationMovie = ({ id }: ListRecommendationMovieProps) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    loadMovies();
  }, [id]);

  async function loadMovies() {
    const response = await MoviesService.getRecommendations(id);
    setMovieList(response);
  }
  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4 mt-5">
        <h2 className="text-xl md:text-2xl font-bold ">Peliculas Similares</h2>
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
    </section>
  );
};

export default ListRecommendationMovie;
