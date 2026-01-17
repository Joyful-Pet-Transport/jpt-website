import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import DynamicButton from "../elements/button/DynamicButton";
import Image from "next/image";

const HeroSection: FC = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* section 1 */}
      <div className="relative h-[70vh] flex w-full">
        <div className="absolute -top-32 -right-[110px]">
          <Image
            src={"/images/element/hero1.png"}
            alt="Pet transportation hero image"
            width={800}
            height={900}
          />
        </div>
        <BoxedContainer>
          <div className="flex h-full justify-center items-center">
            <div className="flex flex-col gap-6 w-full">
              <Heading>Transporting Pets Has Never Been This Easy</Heading>
              <BodyText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </BodyText>
              <div className="flex flex-row gap-6">
                <DynamicButton>BOOK NOW</DynamicButton>
                <DynamicButton type="outline">LEARN MORE</DynamicButton>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full"></div>
          </div>
        </BoxedContainer>
      </div>

      {/* section 2 */}
      <div className="relative h-[70vh] flex w-full">
        <div className="absolute top-0 -left-[400px]">
          <Image
            src={"/images/element/hero2.png"}
            alt="Pet transportation hero image"
            width={1034}
            height={776}
          />
        </div>
        <BoxedContainer>
          <div className="flex h-full justify-center items-center">
            <div className="flex flex-col gap-4 w-full"></div>
            <div className="flex flex-col gap-6 w-full items-end">
              <Heading className="text-end">
                Trusted by Hundreds of Furparents
              </Heading>
              <BodyText className="text-end">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </BodyText>
              <div className="flex flex-row gap-6">
                <DynamicButton>BOOK NOW</DynamicButton>
                <DynamicButton type="outline">LEARN MORE</DynamicButton>
              </div>
            </div>
          </div>
        </BoxedContainer>
      </div>
    </div>
  );
};

export default HeroSection;
