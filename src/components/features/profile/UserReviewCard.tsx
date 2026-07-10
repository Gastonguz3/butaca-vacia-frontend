"use client";

import Link from "next/link";
import { ReviewResponse } from "@/types/review/review-response";
import { FaArrowRight, FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  review: ReviewResponse;

  onEdit?: (review: ReviewResponse) => void;
  onDelete?: () => void;
};

const UserReviewCard = ({ review, onEdit, onDelete }: Props) => {
  const href =
    review.mediaType === "MOVIE"
      ? `/movie/${review.tmdbId}`
      : `/series/${review.tmdbId}`;

  return (
    <article className="rounded-2xl border border-yellow-600/20 bg-black/30 p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={href}
            className="text-xl font-bold text-yellow-400 hover:text-yellow-300 transition"
          >
            {review.titleShow}
          </Link>

          <p className="mt-1 text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: 5 }, (_, i) =>
            i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />,
          )}
        </div>
      </div>

      <p className="mt-5 whitespace-pre-line leading-relaxed text-gray-200">
        {review.comment}
      </p>

      <div className="mt-6 flex justify-between">
        <Link
          href={href}
          className="text-sm font-medium text-yellow-400 hover:underline"
        >
          Ver {review.mediaType === "MOVIE" ? "película" : "serie"}
        </Link>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit?.(review)}
            className="rounded-lg bg-yellow-600 px-4 py-2 font-medium text-black transition hover:bg-yellow-500 cursor-pointer"
          >
            Editar
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-700 px-4 py-2 transition hover:bg-red-600 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserReviewCard;
