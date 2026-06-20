import { Genre } from "@/types/genre";
import { apiFetch } from "./api";
import { Series } from "@/types/series/series";
import { PaginatedResponse } from "@/types/paginated-response";
import { SeriesDetails } from "@/types/series/series-details";

export const SeriesService = {
  getGenres(): Promise<Genre[]> {
    return apiFetch<Genre[]>("/api/series/genres");
  },

  discoverByGenre(genre: number): Promise<Series> {
    return apiFetch<Series>(`/api/series/discover?genre=${genre}`);
  },

  getPopular(page: number, limit: number): Promise<PaginatedResponse<Series>> {
    return apiFetch<PaginatedResponse<Series>>(`/api/series/popular?page=${page}&limit=${limit}`);
  },

  getDetails(id: number): Promise<SeriesDetails> {
    return apiFetch<SeriesDetails>(`/api/series/${id}`);
  },

  getRecommendations(id: number): Promise<Series[]> {
    return apiFetch<Series[]>(`/api/series/${id}/recommendations`);
  },
};
