import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import TestimonialContents from "@/components/contents/TestimonialContents";
import Heading from "@/components/elements/text/Heading";

const TestimonialsScreen = () => {
  return (
    <PageWrapperContainer>
      <BoxedContainer medium>
        <Heading font="fredoka" className="text-center">What Our Client Says?</Heading>
        <TestimonialContents />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default TestimonialsScreen;
