"use client";

import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import UnderConstructionContent from "@/components/contents/UnderConstructionContent";
import BodyText from "@/components/elements/text/BodyText";
import BookingProcessSection from "@/components/sections/BookingProcess";
import ContactUsSection from "@/components/sections/ContactUs";
import HeroSection from "@/components/sections/HeroSection";
import OurServices from "@/components/sections/OurServices";
import ProofOfLegitimacy from "@/components/sections/ProofOfLegitimacy";
import TestimonialSection from "@/components/sections/Testimonials";

const Home = () => {
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <UnderConstructionContent />;
  }

  return (
    <PageWrapperContainer className="flex flex-col gap-12 overflow-hidden">
      <HeroSection />
      <OurServices />
      <BookingProcessSection />
      <ProofOfLegitimacy />
      <TestimonialSection />
      <ContactUsSection />
    </PageWrapperContainer>
  );
};

export default Home;
