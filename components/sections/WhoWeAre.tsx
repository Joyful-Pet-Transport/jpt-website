"use client";

import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const WhoWeAre: FC = () => {
  return (
    <section className="w-full bg-white">
      <BoxedContainer>
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <Heading font="fredoka" weight="semibold" size="medium">
              WHO WE ARE
            </Heading>
            <BodyText className="text-justify">
              We are a dedicated pet logistics team committed to providing safe,
              smooth, and compassionate transportation for pets worldwide. With
              experience in both domestic and international relocations, we
              ensure that every pet&apos;s journey is handled with
              professionalism and heart.
            </BodyText>
            <BodyText className="text-justify">
              At Joyful Pet Transport, we understand that every pet relocation
              is unique, which is why we specialize in creating flexible
              solutions tailored to what is most convenient for our clients.
              From coordinating veterinary requirements and documentation to
              arranging flights and ground transport, we handle the complex
              logistics so furparents can have peace of mind. Our goal is to
              make the entire process as smooth and stress-free as possible for
              both pets and their owners, through clear communication, careful
              planning, and a genuine love for animals—treating every pet as if
              they were our own and ensuring they arrive safely, comfortably,
              and happily at their new destination. 🐾✈️💖
            </BodyText>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={"/images/element/ourteam.jpg"}
                alt="Our Team"
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 260px"
                className="object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>
      </BoxedContainer>
    </section>
  );
};

export default WhoWeAre;
