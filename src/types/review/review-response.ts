export type ReviewResponse = {
  id: string;
  rating: number;
  comment: string;
  tmdbId: number;
  mediaType: 'MOVIE' | 'SERIES';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}