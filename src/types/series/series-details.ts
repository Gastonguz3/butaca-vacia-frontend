import { Genre } from "./genre";
import { Series } from "./series";

export type SeriesDetails = Series & {
  created_by: {
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  genres: Genre[];
  networks: {   //Plataformas que lo emite (Netflix, Hbo, etc.)
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;

  production_companies: {   //Empresas que produjeron la serie
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];

  /*production_countries: {
    iso_3166_1: string;
    name: string;
  }[];*/

  seasons: {
    id: number;
    name: string;
    air_date: string;
    episode_count: number;
    poster_path: string | null;
    season_number: number;
  }[];
};
