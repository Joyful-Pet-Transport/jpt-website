"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import TestimonialPageContents from "@/components/contents/TestimonialPageContents";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";

const TestimonialsScreen = () => {
  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[{ label: "Home", path: "/" }, { label: "Testimonials" }]}
      />
      <BoxedContainer medium>
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto">
          <Heading font="fredoka" className="text-center">
            What Our Client Says?
          </Heading>
          <BodyText className="text-center">
            Read the experiences of families who trusted us with their pets’
            journey.
          </BodyText>
        </div>
        <TestimonialPageContents />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default TestimonialsScreen;
