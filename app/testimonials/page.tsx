"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import TestimonialPageContents from "@/components/contents/TestimonialPageContents";
import Heading from "@/components/elements/text/Heading";

const TestimonialsScreen = () => {
  return (
    <PageWrapperContainer>
      <BoxedContainer>
        <Heading font="fredoka" className="text-center">
          What Our Client Says?
        </Heading>
        <TestimonialPageContents />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default TestimonialsScreen;
