import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FC } from "react";
import TestimonialCard from "../card/TestimonialCard";

const TestimonialPageContents: FC = () => {
  const reviews = useQuery(api.tables.google_reviews.get);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
      {reviews?.map((review, index) => (
        <TestimonialCard key={index} review={review} />
      ))}
    </div>
  );
};

export default TestimonialPageContents;
