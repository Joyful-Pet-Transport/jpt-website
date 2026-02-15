"use client";

import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import UnderConstructionContent from "@/components/contents/UnderConstructionContent";
import BookingProcessSection from "@/components/sections/BookingProcess";
import ConnectWithUs from "@/components/sections/ConnectWithUs";
import ContactUsSection from "@/components/sections/ContactUs";
import HeroSection from "@/components/sections/HeroSection";
import OurServices from "@/components/sections/OurServices";
import ProofOfLegitimacy from "@/components/sections/ProofOfLegitimacy";
import RecognizedByMediaSection from "@/components/sections/RecognizedByMedia";
import TestimonialSection from "@/components/sections/Testimonials";

const Home = () => {
  const maintenanceMode =
    process.env.NEXT_PUBLIC_MAINTENANCE_ENABLED === "true";

  if (maintenanceMode) {
    return <UnderConstructionContent />;
  }

  return (
    <PageWrapperContainer removeBg>
      <HeroSection />
      <OurServices />
      <BookingProcessSection />
      <RecognizedByMediaSection />
      <TestimonialSection />
      <ConnectWithUs />
      <ContactUsSection />
    </PageWrapperContainer>
  );
};

export default Home;
