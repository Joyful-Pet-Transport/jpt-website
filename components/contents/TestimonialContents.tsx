"use client";

import { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";
import TestimonialCarousel from "@/components/ui/carousel/TestimonialCarousel";
import TestimonialLoading from "../elements/loader/TestimonialLoading";
import { GoogleReview } from "@/models/google-reviews";

const TestimonialContents: FC = () => {
  const reviews = useQuery(api.tables.google_reviews.getForCarousel);
  const mobile = useIsMobile();

  if (reviews === undefined) {
    return <TestimonialLoading />;
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  if (mobile) {
    return (
      <div className="flex flex-row gap-6">
        <TestimonialCarousel reviews={reviews as unknown as GoogleReview[]} direction="forward" speed={20} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <TestimonialCarousel reviews={reviews as unknown as GoogleReview[]} direction="forward" speed={50} />
      <TestimonialCarousel reviews={reviews as unknown as GoogleReview[]} direction="backward" speed={50} />
    </div>
  );
};

export default TestimonialContents;