import { FC } from "react";
import Heading from "../elements/text/Heading";
import TestimonialContents from "../contents/TestimonialContents";

const TestimonialSection: FC = () => {
  return (
    <div className="py-12 flex flex-col gap-10">
      <Heading className="flex self-center" weight="semibold" size="medium">
        TESTIMONIALS
      </Heading>
      <TestimonialContents />
    </div>
  );
};

export default TestimonialSection;
