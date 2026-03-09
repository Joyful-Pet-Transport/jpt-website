import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const WhatMakesUsDiff: FC = () => {
  return (
    <BoxedContainer className="mt-18">
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <Heading font="fredoka" weight="semibold">
          WHAT MAKES US DIFFERENT
        </Heading>

        {/* Desktop / tablet layout */}
        <div className="relative w-full max-w-3xl items-center justify-center hidden md:flex">
          {/* Colored rectangles behind the image */}
          <div className="absolute -left-30 top-10 w-lg rounded-2xl bg-sky-400 py-6 pl-12">
            <BodyText>We treat every pet as family</BodyText>
          </div>

          <div className="absolute -right-42 top-30 w-md rounded-2xl bg-orange-400 py-6 pl-36">
            <BodyText>Safe and stress-free journeys</BodyText>
          </div>
          <div className="absolute -left-64 top-52 w-lg rounded-2xl bg-neutral-100 py-6 pl-12">
            <BodyText>Professional, loving handlers</BodyText>
          </div>
          <div className="absolute -right-56 bottom-36 w-xl rounded-2xl bg-sky-600 py-6 pl-56">
            <BodyText>Real-time updates & support</BodyText>
          </div>
          <div className="absolute -left-42 bottom-14 w-lg rounded-2xl bg-amber-100 p-3 py-6 pl-12">
            <BodyText>Nationwide, door-to-door service</BodyText>
          </div>

          {/* Main image on top */}
          <div className="relative z-10">
            <Image
              src={"/images/element/Logowborder.png"}
              alt="Joyful Pet Transport"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center w-full max-w-xl gap-8 md:hidden">
          <div className="w-56 h-56 sm:w-64 sm:h-64 relative">
            <Image
              src={"/images/element/Logowborder.png"}
              alt="Joyful Pet Transport"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 70vw"
            />
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 text-center">
            <div className="rounded-2xl bg-sky-400 px-5 py-4">
              <BodyText>We treat every pet as family</BodyText>
            </div>
            <div className="rounded-2xl bg-orange-400 px-5 py-4">
              <BodyText>Safe and stress-free journeys</BodyText>
            </div>
            <div className="rounded-2xl bg-neutral-100 px-5 py-4">
              <BodyText>Professional, loving handlers</BodyText>
            </div>
            <div className="rounded-2xl bg-sky-600 px-5 py-4 text-white">
              <BodyText>Real-time updates & support</BodyText>
            </div>
            <div className="rounded-2xl bg-amber-100 px-5 py-4 sm:col-span-2">
              <BodyText>Nationwide, door-to-door service</BodyText>
            </div>
          </div>
        </div>
      </div>
    </BoxedContainer>
  );
};

export default WhatMakesUsDiff;
