import { FC } from "react";
import Heading from "../elements/text/Heading";
import TestimonialContents from "../contents/TestimonialContents";
import BodyText from "../elements/text/BodyText";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

const TestimonialSection: FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10 pb-12">
      <Heading font="fredoka" className="flex self-center uppercase">
        What Our Client Says?
      </Heading>
      <TestimonialContents />

      <BodyText
        onPress={() => router.push("/testimonials")}
        className="text-center "
        textColor="hover:text-blue-500 cursor-pointer"
      >
        View more
        <FaArrowRightLong className="inline ml-2" />
      </BodyText>
    </div>
  );
};

export default TestimonialSection;
