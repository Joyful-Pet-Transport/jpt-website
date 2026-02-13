"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import ServicePageImageContainer from "@/components/containers/ServicePageImageContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import Breadcrumbs from "@/components/elements/Breadcrumbs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const OurServicesScreen = () => {
  const services = useQuery(api.tables.services.get);

  return (
    <PageWrapperContainer className="items-center bg-[#EAEAEA] -mt-12 mx-4 rounded-b-4xl">
      <BoxedContainer medium className="flex flex-col gap-12">
        <Breadcrumbs
          items={[{ label: "Home", path: "/" }, { label: "Our Services" }]}
        />

        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto">
          <Heading className="text-center">Our Services</Heading>
          <BodyText className="text-center">
            Explore our pet relocation services with smooth, a walkthrough to
            our service to make every journey safe and stress-free.
          </BodyText>
        </div>

        <div className="w-full flex flex-row flex-wrap gap-6 justify-between">
          {services?.map(({ _id, title, description, image }) => (
            <ServicePageImageContainer
              key={_id}
              title={title}
              description={description}
              image={image}
              onPress={() => {}}
            />
          ))}
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default OurServicesScreen;
