import { Genre } from "@/types/genre";
import { apiFetch } from "./api";
import { PaginatedResponse } from "@/types/paginated-response";
import { Movie } from "@/types/movies/movie";
import { MovieDetails } from "@/types/movies/movie-details";

export const MoviesService = {
  getGenres(): Promise<Genre[]> {
    return apiFetch<Genre[]>("/movies/genres");
  },

  searchByGenre(genre: number): Promise<PaginatedResponse<Movie>> {
    return apiFetch<PaginatedResponse<Movie>>(`/movies/search?genre=${genre}`);
  },

  getPopular(): Promise<PaginatedResponse<Movie>> {
    return apiFetch<PaginatedResponse<Movie>>("/movies/popular");
  },

  getDetails(id: number): Promise<MovieDetails> {
    return apiFetch<MovieDetails>(`/movies/${id}`);
  },

  getRecommendations(id: number): Promise<Movie[]> {
    return apiFetch<Movie[]>(`/movies/${id}/recommendations`);
  },
};
