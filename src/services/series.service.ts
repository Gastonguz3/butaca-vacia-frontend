import { Genre } from "@/types/genre";
import { apiFetch } from "./api";
import { Series } from "@/types/series/series";
import { PaginatedResponse } from "@/types/paginated-response";
import { SeriesDetails } from "@/types/series/series-details";

export const SeriesService = {
  getGenres(): Promise<Genre[]> {
    return apiFetch<Genre[]>("/series/genres");
  },

  searchByGenre(genre: number): Promise<PaginatedResponse<Series>> {
    return apiFetch<PaginatedResponse<Series>>(`/series/search?genre=${genre}`);
  },

  getPopular(): Promise<PaginatedResponse<Series>> {
    return apiFetch<PaginatedResponse<Series>>("/series/popular");
  },

  getDetails(id: number): Promise<SeriesDetails> {
    return apiFetch<SeriesDetails>(`/series/${id}`);
  },

  getRecommendations(id: number): Promise<Series[]> {
    return apiFetch<Series[]>(`/series/${id}/recommendations`);
  },
};
