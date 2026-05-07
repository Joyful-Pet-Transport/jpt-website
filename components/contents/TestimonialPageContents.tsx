import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FC } from "react";
import TestimonialCard from "../card/TestimonialCard";

const TestimonialPageContents: FC = () => {
  const reviews = useQuery(api.tables.google_reviews.get);
  const leftColumn = reviews?.filter((_, index) => index % 2 === 0) ?? [];
  const rightColumn = reviews?.filter((_, index) => index % 2 === 1) ?? [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col gap-6">
        {leftColumn.map((review, index) => (
          <TestimonialCard key={`left-${index}`} review={review} />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {rightColumn.map((review, index) => (
          <TestimonialCard key={`right-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialPageContents;
