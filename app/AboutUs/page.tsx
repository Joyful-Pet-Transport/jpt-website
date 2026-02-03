import WhoWeAre from "@/components/sections/WhoWeAre";
import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import Mission from "@/components/contents/Mission";
import WhatMakesUsDiff from "@/components/sections/WhatMakesUsDiff";

const AboutUsScreen = () => {
  return (
    <PageWrapperContainer>
      <BoxedContainer medium>
         <div className="flex flex-col justify-center items-center">
          <Heading className="text-center">JOYFUL PET TRANSPORT</Heading>
          <BodyText size="large" weight="semibold" className="text-center pt-6">
          Transporting Pets Has Never Been This Easy
          </BodyText>
          <BodyText size="large" weight="semibold" className="text-center">
          Trusted by Hundreds of Furparents
          </BodyText>
          <WhoWeAre/>
          <Mission />
          <WhatMakesUsDiff />
      
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default AboutUsScreen;
