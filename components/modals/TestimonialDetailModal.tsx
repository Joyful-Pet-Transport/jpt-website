"use client";

import { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { IoClose } from "react-icons/io5";
import TestimonialCard from "../card/TestimonialCard";
import TestimonialCardSkeleton from "../card/TestimonialCardSkeleton";

type TestimonialDetailModalProps = {
  reviewId: string | null;
  onClose: () => void;
};

const TestimonialDetailModal: FC<TestimonialDetailModalProps> = ({
  reviewId,
  onClose,
}) => {
  const review = useQuery(
    api.tables.google_reviews.getReview,
    reviewId ? { reviewId: reviewId as Id<"google_reviews"> } : "skip"
  );

  if (!reviewId) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-700 bg-white rounded-full p-2 shadow hover:bg-gray-100"
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>

        {review === undefined ? (
          <TestimonialCardSkeleton />
        ) : review === null ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
            Review not found.
          </div>
        ) : (
          <TestimonialCard review={review} />
        )}
      </div>
    </div>
  );
};

export default TestimonialDetailModal;