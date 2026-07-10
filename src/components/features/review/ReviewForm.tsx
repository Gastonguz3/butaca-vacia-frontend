"use client";

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  loading?: boolean;

  initialRating?: number;
  initialComment?: string;

  onSubmit: (rating: number, comment: string) => Promise<void>;

  submitText?: string;
};

const ReviewForm = ({
  loading = false,
  initialRating = 0,
  initialComment = "",
  submitText = "Publicar",
  onSubmit,
}: Props) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (rating === 0) return;

    if (!comment.trim()) return;

    await onSubmit(rating, comment);

    if (!initialComment) {
      setComment("");
      setRating(0);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-yellow-600/20 bg-black/30 p-6"
    >
      <h2 className="mb-4 text-2xl font-bold">
        Compartí tu opinión
      </h2>

      {/* estrellas */}

      <div className="mb-5 flex gap-2 text-2xl">
        {Array.from({ length: 5 }, (_, index) => {
          const value = index + 1;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              className="cursor-pointer text-yellow-400 transition hover:scale-110"
            >
              {value <= (hover || rating) ? (
                <FaStar />
              ) : (
                <FaRegStar />
              )}
            </button>
          );
        })}
      </div>

      {/* comentario */}

      <textarea
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="¿Qué te pareció?"
        className="w-full resize-none rounded-xl bg-black/40 p-4 outline-none ring-1 ring-yellow-700/20 focus:ring-yellow-500"
      />

      <div className="mt-5 flex justify-end">
        <button
          disabled={loading}
          className="rounded-full bg-yellow-500 px-6 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Enviando..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;