"use client";

import { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";
import TestimonialCarousel from "@/components/ui/carousel/TestimonialCarousel";

const TestimonialContents: FC = () => {
  const reviews = useQuery(api.tables.google_reviews.get);
  const mobile = useIsMobile();

  if (!reviews || reviews.length === 0) {
    return null;
  }

  if (mobile) {
    return (
      <div className="flex flex-row gap-6">
        <TestimonialCarousel reviews={reviews} direction="forward" speed={20} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <TestimonialCarousel reviews={reviews} direction="forward" speed={50} />
      <TestimonialCarousel reviews={reviews} direction="backward" speed={50} />
    </div>
  );
};

export default TestimonialContents;
