import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const WhoWeAre: FC = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* section 1 */}
      <div className="relative h-[70vh] flex w-full">
        
        <div className="absolute -top-12 -right-[400px]">

          <Image
            src={"/images/element/ourteam.png"}
            alt="Our Team"
            width={700}
            height={700}
          />
        </div>
        <BoxedContainer>
          <div className="flex h-full justify-left items-center">
            <div className="flex flex-col gap-6 w-full">
              <Heading weight="semibold" size="medium" className="">WHO WE ARE</Heading>
              <BodyText>
              We are a dedicated pet logistics team committed to providing safe,  smooth, and compassionate transportation for pets worldwide. With  experience in both domestic and international relocations, we ensure  that every pet’s journey is handled with professionalism and heart.
              </BodyText>
              <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </BodyText> 
            </div>
            <div className="flex flex-col gap-4 w-full"></div>
          </div>
        </BoxedContainer>
      </div>

   
    </div>
  );
};

export default WhoWeAre;
