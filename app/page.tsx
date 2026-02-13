"use client";

import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import UnderConstructionContent from "@/components/contents/UnderConstructionContent";
import BookingProcessSection from "@/components/sections/BookingProcess";
import ContactUsSection from "@/components/sections/ContactUs";
import HeroSection from "@/components/sections/HeroSection";
import OurServices from "@/components/sections/OurServices";
import ProofOfLegitimacy from "@/components/sections/ProofOfLegitimacy";
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
      <ProofOfLegitimacy />
      <TestimonialSection />
      <ContactUsSection />
    </PageWrapperContainer>
  );
};

export default Home;
