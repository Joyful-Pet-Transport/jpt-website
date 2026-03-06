import { FC } from "react";
import Heading from "../elements/text/Heading";
import BookingProcessContent from "../contents/BookingProcessContent";
import Image from "next/image";
import { useIsMobile, useIsTablet } from "@/utils/hooks/useWindowsDimensions";

const BookingProcessSection: FC = () => {
  const mobile = useIsMobile();
  const tablet = useIsTablet();

  if (tablet) {
    return (
      <div className="flex pb-16 flex-col items-start w-full">
        <div className="px-16 flex flex-row items-end justify-between w-full relative">
          <Heading font="fredoka" className="pb-8">
            Our Joyful 4-Step Pet <br /> Transport Booking Process
          </Heading>
          <div>
            <Image
              src={"/images/element/bookingprocess.png"}
              alt="Booking Process"
              width={500}
              height={500}
              className="w-72 h-auto"
            />
          </div>
        </div>
        <BookingProcessContent />
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="pb-16 flex flex-col w-full">
        <div className=" flex flex-row items-end w-full">
          <Heading font="fredoka" className="w-100">
            Our Joyful 4-Step Pet <br /> Transport Booking Process
          </Heading>
          <div className="pr-4">
            <Image
              src={"/images/element/bookingprocess.png"}
              alt="Booking Process"
              width={111}
              height={89}
            />
          </div>
        </div>
        <BookingProcessContent />
      </div>
    );
  }
  return (
    <div className="flex pb-16 flex-col items-start w-full">
      <div className="px-16 flex flex-row items-end justify-between w-full relative">
        <Heading font="fredoka" className="pb-8">
          Our Joyful 4-Step Pet <br /> Transport Booking Process
        </Heading>
        <div className="pr-24">
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
