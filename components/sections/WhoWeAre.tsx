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
            <Heading font="fredoka" weight="semibold">
              WHO WE ARE
            </Heading>
            <BodyText>
              We are a dedicated pet logistics team committed to providing safe,
              smooth, and compassionate transportation for pets worldwide. With
              experience in both domestic and international relocations, we
              ensure that every pet&apos;s journey is handled with
              professionalism and heart.
            </BodyText>
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
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
