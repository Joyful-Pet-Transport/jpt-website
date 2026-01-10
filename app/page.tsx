"use client";

import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import UnderConstructionContent from "@/components/contents/UnderConstructionContent";
import BodyText from "@/components/elements/text/BodyText";
import HeroSection from "@/components/sections/HeroSection";

const Home = () => {
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <UnderConstructionContent />;
  }

  return (
    <PageWrapperContainer>
      <HeroSection />
    </PageWrapperContainer>
  );
};

export default Home;
