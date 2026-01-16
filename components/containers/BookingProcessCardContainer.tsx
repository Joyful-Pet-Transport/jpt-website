import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";

type BookingProcessCardContainerProps = {
  step: number;
  title: string;
};

const BookingProcessCardContainer: FC<BookingProcessCardContainerProps> = (
  props
) => {
  const isRight = props.step % 2 === 0;

  const StepNumber: FC = () => {
    return (
      <div className="w-32 h-32 rounded-full bg-[#FEF5EE] flex justify-center items-center">
        <Heading>{props.step}</Heading>
      </div>
    );
  };

  return (
    <div
      className={`w-3/5 ${
        isRight ? "self-end rounded-l-2xl" : "rounded-r-2xl"
      } overflow-hidden`}
    >
      <div
        className={`items-center flex flex-row p-4 ${
          isRight ? "rounded-r-full" : "rounded-l-full"
        } bg-linear-to-r from-[#6EB2BC] to-[#6DCA9E]`}
      >
        {!isRight && <StepNumber />}
        <div className="px-4 flex flex-1">
          <BodyText size="large">{props.title}</BodyText>
        </div>
        {isRight && <StepNumber />}
      </div>
    </div>
  );
};

export default BookingProcessCardContainer;
