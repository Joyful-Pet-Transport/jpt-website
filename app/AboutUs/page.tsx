import WhoWeAre from "@/components/sections/WhoWeAre";
import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import Mission from "@/components/contents/Mission";
import WhatMakesUsDiff from "@/components/sections/WhatMakesUsDiff";
import Vision from "@/components/contents/Vision";
import Breadcrumbs from "@/components/elements/Breadcrumbs";

const AboutUsScreen = () => {
  return (
    <PageWrapperContainer className="items-center bg-[#EAEAEA] -mt-12 mx-4 rounded-b-4xl">
      <BoxedContainer medium className="flex flex-col gap-12">
        <Breadcrumbs
          items={[{ label: "Home", path: "/" }, { label: "About Us" }]}
        />
        <div className="flex flex-col justify-center items-center">
          <Heading className="text-center">JOYFUL PET TRANSPORT</Heading>
          <BodyText size="large" weight="semibold" className="text-center pt-6">
            Transporting Pets Has Never Been This Easy
          </BodyText>
          <BodyText size="large" weight="semibold" className="text-center">
            Trusted by Hundreds of Furparents
          </BodyText>
          <WhoWeAre />
          <div className="flex flex-col-2 gap-12">
            <Mission />
            <Vision />
          </div>

          <WhatMakesUsDiff />
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default AboutUsScreen;
