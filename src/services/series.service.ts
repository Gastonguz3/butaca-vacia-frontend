import { apiFetch } from "./api";

export const SeriesService = {
  getGenres() {
    return apiFetch("/series/genres");
  },

  searchByGenre(genre: number) {
    return apiFetch(`/series/search?genre=${genre}`);
  },

  getPopular(){
    return apiFetch("/series/popular")
  },

  getDetails(id: number){
    return apiFetch(`/series/${id}`)
  },

  getRecommendations(id: number){
    return apiFetch(`/series/${id}/recommendations`)
  }

};
