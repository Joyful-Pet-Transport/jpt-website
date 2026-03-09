import WhoWeAre from "@/components/sections/WhoWeAre";
import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import MissionVision from "@/components/contents/MissionVision";
import WhatMakesUsDiff from "@/components/sections/WhatMakesUsDiff";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";

const AboutUsScreen = () => {
  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[{ label: "Home", path: "/" }, { label: "About Us" }]}
      />
      <BoxedContainer medium className="flex flex-col gap-12">
        <div className="flex flex-col justify-center items-center">
          <Heading font="fredoka" className="text-center">JOYFUL PET TRANSPORT</Heading>
          <BodyText size="large" weight="semibold" className="text-center pt-6">
            Transporting Pets Has Never Been This Easy
          </BodyText>
          <BodyText size="large" weight="semibold" className="text-center">
            Trusted by Hundreds of Furparents
          </BodyText>
          <WhoWeAre />
          <MissionVision />
          <WhatMakesUsDiff />
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default AboutUsScreen;
