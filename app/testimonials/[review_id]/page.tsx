"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import TestimonialCard from "@/components/card/TestimonialCard";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const TestimonialReviewScreen = () => {
  const { review_id } = useParams();
  const reviewId = Array.isArray(review_id) ? review_id[0] : review_id;

  if (!reviewId)
    return <PageWrapperContainer>Page Not Found</PageWrapperContainer>;

  const review = useQuery(api.tables.google_reviews.getReview, {
    reviewId: reviewId as Id<"google_reviews">,
  });

  if (review === undefined) {
    return (
      <PageWrapperContainer>
        <BoxedContainer medium>
          <BodyText className="text-center">Loading testimonial...</BodyText>
        </BoxedContainer>
      </PageWrapperContainer>
    );
  }

  if (!review) {
    return (
      <PageWrapperContainer>
        <BoxedContainer medium>
          <BodyText className="text-center">Testimonial not found.</BodyText>
        </BoxedContainer>
      </PageWrapperContainer>
    );
  }

  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[
          {
            label: "Testimonials",
            path: "/testimonials",
          },
        ]}
      />
      <BoxedContainer medium>
        <div className="text-center">
          <Heading size="medium" font="fredoka" className="uppercase">
            Testimonial Review
          </Heading>
          <BodyText>Read this full customer experience.</BodyText>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <TestimonialCard review={review} />
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default TestimonialReviewScreen;
