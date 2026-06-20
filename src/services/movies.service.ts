import { Genre } from "@/types/genre";
import { apiFetch } from "./api";
import { PaginatedResponse } from "@/types/paginated-response";
import { Movie } from "@/types/movies/movie";
import { MovieDetails } from "@/types/movies/movie-details";

export const MoviesService = {
  getGenres(): Promise<Genre[]> {
    return apiFetch<Genre[]>("/api/movies/genres");
  },

  discoverByGenre(genre: number): Promise<Movie> {
    return apiFetch<Movie>(`/api/movies/discover?genre=${genre}`);
  },

  getPopular(page: number, limit: number): Promise<PaginatedResponse<Movie>> {
    return apiFetch<PaginatedResponse<Movie>>(`/api/movies/popular?page=${page}&limit=${limit}`);
  },

  getDetails(id: number): Promise<MovieDetails> {
    return apiFetch<MovieDetails>(`/api/movies/${id}`);
  },

  getRecommendations(id: number): Promise<Movie[]> {
    return apiFetch<Movie[]>(`/api/movies/${id}/recommendations`);
  },
};
