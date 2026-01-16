import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import BookingProcessContent from "../contents/BookingProcessContent";

const BookingProcessSection: FC = () => {
  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <Heading weight="semibold" size="medium">
          BOOKING PROCESS
        </Heading>
        <BookingProcessContent />
      </div>
    </BoxedContainer>
  );
};

export default BookingProcessSection;
