import { FC } from "react";
import Heading from "../elements/text/Heading";

const TestimonialSection: FC = () => {
  return (
    <div className="py-12 flex flex-col">
      <Heading className="flex self-center" weight="semibold" size="medium">
        TESTIMONIALS
      </Heading>
    </div>
  );
};

export default TestimonialSection;
