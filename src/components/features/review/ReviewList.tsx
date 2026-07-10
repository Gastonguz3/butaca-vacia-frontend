"use client";

import { ReviewWithUser } from "@/types/review/review-with-user";
import ReviewCard from "./ReviewCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  reviews: ReviewWithUser[];

  page: number;
  totalPages: number;

  onPrevious: () => void;
  onNext: () => void;

  onEdit?: (review: ReviewWithUser) => void;
  onDelete?: (reviewId: string) => void;
};

//Este componente recibe un arreglo de comentarios y lo personalizo
const ReviewList = ({
  reviews,
  page,
  totalPages,
  onPrevious,
  onNext,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <section className="mt-10">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Opiniones de la comunidad</h2>

        {totalPages > 1 && (
          <div className="flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={onPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>

            <span className="font-medium">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={onNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Lista */}

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-yellow-600/30 bg-black/20 p-8 text-center text-gray-400">
          Todavía nadie comentó esta película.
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewList;
