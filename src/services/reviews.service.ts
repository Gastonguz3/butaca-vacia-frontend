import { PaginatedResponse } from "@/types/paginated-response";
import { apiFetch } from "./api";
import { ReviewResponse } from "@/types/review/review-response";
import { ReviewWithUser } from "@/types/review/review-with-user";
import { CreateReview } from "@/types/review/create-review";
import { UpdateReview } from "@/types/review/update-review";

export const ReviewsService = {
  async findMyReviews(
    accessToken: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<ReviewResponse>> {
    return apiFetch<PaginatedResponse<ReviewResponse>>(
      `/api/reviews/me/list?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  async findByContent(
    mediaType: 'MOVIE' | 'SERIES',
    tmdbId: number,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<ReviewWithUser>> {
    return apiFetch<PaginatedResponse<ReviewWithUser>>(
      `/api/reviews/${mediaType}/${tmdbId}?page=${page}&limit=${limit}`,
    );
  },

  async create(
    accessToken: string,
    review: CreateReview,
  ): Promise<ReviewWithUser> {
    return apiFetch<ReviewWithUser>("/api/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(review),
    });
  },

  async update(
    accessToken: string,
    reviewId: string,
    review: UpdateReview,
  ): Promise<ReviewResponse> {
    return apiFetch<ReviewResponse>(`/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(review),
    });
  },

  async remove(
    accessToken: string,
    reviewId: string,
  ): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
