import { FC } from "react";
import Heading from "../elements/text/Heading";
import TestimonialContents from "../contents/TestimonialContents";
import BodyText from "../elements/text/BodyText";

const TestimonialSection: FC = () => {
  return (
    <div className="py-12 flex flex-col gap-10">
      <Heading className="flex self-center" weight="semibold" size="medium">
        TESTIMONIALS
      </Heading>
      <TestimonialContents />
      <div className="w-full flex justify-center">
        <BodyText onPress={() => {}} size="large">
          View Reviews →
        </BodyText>
      </div>
    </div>
  );
};

export default TestimonialSection;
