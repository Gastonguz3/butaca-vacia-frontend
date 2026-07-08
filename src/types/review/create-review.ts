export type CreateReview = {

  tmdbId: number;

  mediaType: 'MOVIE' | 'SERIES';

  rating: number;

  comment: string;
}