export type ReviewWithUser = {
  id: string;
  rating: number;
  comment: string;
  tmdbId: number;
  mediaType: 'MOVIE' | 'SERIES';
  titleShow: string;
  createdAt: Date;
  updatedAt: Date;

  user: {
    id: string;
    username: string;
  };
}