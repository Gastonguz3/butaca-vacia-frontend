"use client";

import { ReviewWithUser } from "@/types/review/review-with-user";
import { useAuth } from "@/hooks/useAuth";
import { FaRegStar, FaStar } from "react-icons/fa";

type ReviewCardProps = {
  review: ReviewWithUser;
  onEdit?: (review: ReviewWithUser) => void;
  onDelete?: (reviewId: string) => void;
};

//Este componente representa un comentario
const ReviewCard = ({
  review,
  onEdit,
  onDelete,
}: ReviewCardProps) => {
  const { user, isAuthenticated } = useAuth();

  const isOwner = isAuthenticated && user?.id === review.user.id;

  return (
    <article className="rounded-2xl border border-yellow-600/20 bg-black/30 p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">
            {review.user.username}
          </h3>

          <p className="text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Puntaje */}
        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }, (_, i) =>
            i < review.rating ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
        </div>
      </div>

      {/* Comentario */}

      <p className="mt-5 whitespace-pre-line text-gray-200 leading-relaxed">
        {review.comment}
      </p>

      {/* Acciones */}

      {isOwner && (
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={() => onEdit?.(review)}
            className="rounded-lg bg-yellow-600 px-4 py-2 font-medium text-black transition hover:bg-yellow-500 cursor-pointer"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete?.(review.id)}
            className="rounded-lg bg-red-700 px-4 py-2 transition hover:bg-red-600 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
};

export default ReviewCard;