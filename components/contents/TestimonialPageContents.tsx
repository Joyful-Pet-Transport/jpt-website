"use client";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { FC, useEffect, useRef, useState } from "react";
import TestimonialCard from "../card/TestimonialCard";
import TestimonialCardSkeleton from "../card/TestimonialCardSkeleton";
import TestimonialDetailModal from "../modals/TestimonialDetailModal";
import { GoogleReviewListItem } from "@/models/google-reviews";

const TestimonialPageContents: FC = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.tables.google_reviews.get,
    {},
    { initialNumItems: 9 }
  );

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(9);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [status, loadMore]);

  const isInitialLoading = status === "LoadingFirstPage";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {isInitialLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <TestimonialCardSkeleton key={`skeleton-${i}`} />
            ))
          : results.map((review, index) => (
              <div
                key={review._id ?? index}
                onClick={() => setSelectedReviewId(review._id)}
                className="text-left w-full cursor-pointer"
              >
                <TestimonialCard review={review as unknown as GoogleReviewListItem} />
              </div>
            ))}
      </div>

      <div ref={loadMoreRef} className="h-10 w-full" />

      {status === "LoadingMore" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <TestimonialCardSkeleton key={`loadmore-skeleton-${i}`} />
          ))}
        </div>
      )}

      {status === "Exhausted" && results.length > 0 && (
        <div className="text-center py-6 text-gray-400 text-sm">
          You've reached the end!
        </div>
      )}

      <TestimonialDetailModal
        reviewId={selectedReviewId}
        onClose={() => setSelectedReviewId(null)}
      />
    </div>
  );
};

export default TestimonialPageContents;