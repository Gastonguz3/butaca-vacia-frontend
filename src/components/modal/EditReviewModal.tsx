"use client";

import ReviewForm from "@/components/features/review/ReviewForm";
import { ReviewWithUser } from "@/types/review/review-with-user";

type Props = {
  open: boolean;
  loading: boolean;

  review: ReviewWithUser | null;

  onCancel: () => void;

  onSubmit: (rating: number, comment: string) => Promise<void>;
};

const EditReviewModal = ({
  open,
  loading,
  review,
  onCancel,
  onSubmit,
}: Props) => {
  if (!open || !review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-yellow-700/20 px-6 py-4">
          <h2 className="text-2xl font-bold">
            Editar comentario
          </h2>

          <button
            onClick={onCancel}
            className="text-2xl text-gray-400 hover:text-white cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <ReviewForm
            loading={loading}
            initialRating={review.rating}
            initialComment={review.comment}
            submitText="Guardar cambios"
            onSubmit={onSubmit}
          />
        </div>

      </div>
    </div>
  );
};

export default EditReviewModal;