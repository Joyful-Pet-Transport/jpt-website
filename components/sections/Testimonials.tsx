import { FC } from "react";
import Heading from "../elements/text/Heading";
import TestimonialContents from "../contents/TestimonialContents";
import BodyText from "../elements/text/BodyText";

const TestimonialSection: FC = () => {
  return (
    <div className="flex flex-col gap-10 pb-12">
      <Heading font="fredoka" className="flex self-center">
        What Our Client Says?
      </Heading>
      <TestimonialContents />
    </div>
  );
};

export default TestimonialSection;
