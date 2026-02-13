import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import BookingProcessContent from "../contents/BookingProcessContent";
import Image from "next/image";

const BookingProcessSection: FC = () => {
  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-start w-full gap-0">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading>
            Our Joyful 4-Step Pet <br /> Transport Booking Process
          </Heading>
          <Image
            src={"/images/element/bookingprocess.png"}
            alt="Booking Process"
            width={200}
            height={200}
          />
        </div>
        <BookingProcessContent />
      </div>
    </BoxedContainer>
  );
};

export default BookingProcessSection;
