import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import BookingProcessContent from "../contents/BookingProcessContent";
import Image from "next/image";

const BookingProcessSection: FC = () => {
  return (
    <div className="flex flex-col items-start w-full gap-4">
      <div className="flex flex-row items-center justify-between w-full relative">
        <Heading font="fredoka">
          Our Joyful 4-Step Pet <br /> Transport Booking Process
        </Heading>
        <div className="absolute right-30 -top-50">
          <Image
            src={"/images/element/bookingprocess.png"}
            alt="Booking Process"
            width={500}
            height={500}
            className="w-96 h-auto"
          />
        </div>
      </div>
      <BookingProcessContent />
    </div>
  );
};

export default BookingProcessSection;
