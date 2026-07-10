"use client";

import { useEffect, useState } from "react";

import { ReviewWithUser } from "@/types/review/review-with-user";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";

import toast from "react-hot-toast";
import { ReviewsService } from "@/services/reviews.service";
import EditReviewModal from "@/components/modal/EditReviewModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";

type Props = {
  tmdbId: number;
  mediaType: "MOVIE" | "SERIES";
};

const ReviewSection = ({ tmdbId, mediaType }: Props) => {
  const { isAuthenticated, accessToken } = useAuth();

  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [editingReview, setEditingReview] = useState<ReviewWithUser | null>(
    null,
  );
  const [reviewToDelete, setReviewToDelete] = useState<ReviewWithUser | null>(
    null,
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [page]);

  async function loadReviews() {
    const response = await ReviewsService.findByContent(
      mediaType,
      tmdbId,
      page,
      10,
    );

    setReviews(response.data);

    setTotalPages(response.meta.totalPages);
  }

  //Crear review
  async function createReview(rating: number, comment: string) {
    if (!accessToken) return;

    try {
      setLoading(true);

      await ReviewsService.create(accessToken, {
        tmdbId,
        mediaType,
        rating,
        comment,
      });

      toast.success("Comentario publicado");

      loadReviews();
    } catch {
      toast.error("No fue posible publicar el comentario");
    } finally {
      setLoading(false);
    }
  }

  //Actualizar review
  async function updateReview(rating: number, comment: string) {
    if (!accessToken || !editingReview) return;

    try {
      setLoading(true);

      await ReviewsService.update(accessToken, editingReview.id, {
        rating,
        comment,
      });

      toast.success("Comentario actualizado");

      await loadReviews();

      setOpenEdit(false);
      setEditingReview(null);
    } catch (error) {
      toast.error("No fue posible actualizar el comentario");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(review: ReviewWithUser) {
    setEditingReview(review);
    setOpenEdit(true);
  }

  //Eliminar Review
  async function deleteReview() {
    if (!accessToken || !reviewToDelete) return;

    try {
      setLoadingDelete(true);

      await ReviewsService.remove(accessToken, reviewToDelete.id);

      toast.success("Comentario eliminado");

      await loadReviews();

      setOpenDelete(false);
      setReviewToDelete(null);
    } catch {
      toast.error("No fue posible eliminar el comentario");
    } finally {
      setLoadingDelete(false);
    }
  }

  function handleDelete(reviewId: string) {
    const review = reviews.find((r) => r.id === reviewId);

    if (!review) return;

    setReviewToDelete(review);
    setOpenDelete(true);
  }

  return (
    <section className="mx-auto mt-14 max-w-6xl px-4 pb-14">
      {isAuthenticated ? (
        <ReviewForm loading={loading} onSubmit={createReview} />
      ) : (
        <div className="rounded-2xl border border-yellow-700/20 bg-black/30 p-6 text-center">
          <h2 className="text-2xl font-bold">Compartí tu opinión</h2>

          <p className="mt-3 text-gray-300">
            Iniciá sesión para comentar esta película.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-full  bg-linear-to-r from-gray-600 to-yellow-600 cursor-pointer hover:scale-110 hover:from-gray-500 hover:to-yellow-500 transition-all duration-300 px-6 py-2 font-semibold "
          >
            Iniciar sesión
          </Link>
        </div>
      )}

      <ReviewList
        reviews={reviews}
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditReviewModal
        open={openEdit}
        review={editingReview}
        loading={loading}
        onCancel={() => {
          setOpenEdit(false);
          setEditingReview(null);
        }}
        onSubmit={updateReview}
      />

      <ConfirmDeleteModal
        title="Eliminar comentario"
        message="¿Estás seguro de que querés eliminar este comentario? Esta acción no se puede deshacer."
        open={openDelete}
        loading={loadingDelete}
        onCancel={() => {
          setOpenDelete(false);
          setReviewToDelete(null);
        }}
        onConfirm={deleteReview}
      />
    </section>
  );
};

export default ReviewSection;
