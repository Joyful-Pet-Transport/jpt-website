import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const WhatMakesUsDiff: FC = () => {
  return (
    <BoxedContainer className="py-12 mt-32">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:gap-24">
        <Heading weight="semibold" size="medium">
          WHAT MAKES US DIFFERENT
        </Heading>

        {/* Mobile: stacked list */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          {[
            { color: "bg-sky-400", text: "We treat every pet as family" },
            { color: "bg-orange-400", text: "Safe and stress-free journeys" },
            { color: "bg-neutral-100", text: "Professional, loving handlers" },
            { color: "bg-sky-600", text: "Real-time updates & support" },
            { color: "bg-amber-100", text: "Nationwide, door-to-door service" },
          ].map(({ color, text }) => (
            <div key={text} className={`${color} rounded-2xl px-6 py-4`}>
              <BodyText>{text}</BodyText>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <Image
              src={"/images/element/Logowborder.png"}
              alt="Joyful Pet Transport"
              width={300}
              height={300}
            />
          </div>
        </div>

        {/* Desktop: overlapping layout */}
        <div
          className="relative w-full max-w-3xl hidden md:flex items-center justify-center"
          style={{ minHeight: 500 }}
        >
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
          <div className="relative z-10">
            <Image
              src={"/images/element/Logowborder.png"}
              alt="Joyful Pet Transport"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </BoxedContainer>
  );
};

export default WhatMakesUsDiff;
