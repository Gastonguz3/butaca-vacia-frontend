import { apiFetch } from "./api";

export const MoviesService = {
  getGenres() {
    return apiFetch("/movies/genres");
  },

  searchByGenre(genre: number) {
    return apiFetch(`/movies/search?genre=${genre}`);
  },

  getPopular(){
    return apiFetch("/movies/popular")
  },

  getDetails(id: number){
    return apiFetch(`/movies/${id}`)
  },

  getRecommendations(id: number){
    return apiFetch(`/movies/${id}/recommendations`)
  }

};
