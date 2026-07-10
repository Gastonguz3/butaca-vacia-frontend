"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { ReviewsService } from "@/services/reviews.service";

import { ReviewResponse } from "@/types/review/review-response";

import UserReviewCard from "./UserReviewCard";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import EditReviewModal from "@/components/modal/EditReviewModal";

const UserReviews = () => {
  const { accessToken } = useAuth();

  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  const [editingReview, setEditingReview] = useState<ReviewResponse | null>(
    null,
  );

  const [deletingReview, setDeletingReview] = useState<ReviewResponse | null>(
    null,
  );

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [accessToken]);

  async function loadReviews() {
    if (!accessToken) return;

    const response = await ReviewsService.findMyReviews(accessToken, 1, 10);

    setReviews(response.data);
  }

  async function handleEdit(rating: number, comment: string) {
    if (!editingReview || !accessToken) return;

    try {
      setLoadingEdit(true);

      const updated = await ReviewsService.update(
        accessToken,
        editingReview.id,
        {
          rating,
          comment,
        },
      );

      setReviews((prev) =>
        prev.map((review) => (review.id === updated.id ? updated : review)),
      );

      toast.success("Comentario actualizado.");

      setEditingReview(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingEdit(false);
    }
  }

  async function handleDelete() {
    if (!deletingReview || !accessToken) return;

    try {
      setLoadingDelete(true);

      await ReviewsService.remove(accessToken, deletingReview.id);

      setReviews((prev) =>
        prev.filter((review) => review.id !== deletingReview.id),
      );

      toast.success("Comentario eliminado.");

      setDeletingReview(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-yellow-600/20 bg-black/30 p-6">
        <h2 className="mb-6 text-2xl font-bold">Mis comentarios</h2>

        <div className="space-y-5">
          {reviews.length === 0 && (
            <p className="text-gray-400">
              Todavía no hiciste ningún comentario.
            </p>
          )}

          {reviews.map((review) => (
            <UserReviewCard
              key={review.id}
              review={review}
              onEdit={setEditingReview}
              onDelete={() => setDeletingReview(review)}
            />
          ))}
        </div>
      </section>

      <EditReviewModal
        open={!!editingReview}
        loading={loadingEdit}
        review={
          editingReview
            ? {
                ...editingReview,
                user: {
                  id: "",
                  username: "Vos",
                },
              }
            : null
        }
        onCancel={() => setEditingReview(null)}
        onSubmit={handleEdit}
      />

      <ConfirmDeleteModal
        open={!!deletingReview}
        loading={loadingDelete}
        title="Eliminar comentario"
        message={`¿Eliminar tu comentario de "${deletingReview?.titleShow}"?`}
        onCancel={() => setDeletingReview(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default UserReviews;
