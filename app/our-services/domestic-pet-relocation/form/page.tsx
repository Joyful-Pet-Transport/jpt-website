"use client";

import { useSearchParams } from "next/navigation";
import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import DomesticPetRelocationForm from "@/components/forms/DomesticPetRelocationForm";

const DomesticPetRelocationFormScreen = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[
          {
            label: "Domestic Pet Relocation",
            path: "/our-services/domestic-pet-relocation",
          },
          { label: "Form" },
        ]}
      />
      <BoxedContainer medium>
        <div className="text-center">
          <Heading size="medium" font="fredoka" className="uppercase">
            domestic pet Relocation
          </Heading>
          <BodyText>
            A safe, convenient way to move pets anywhere within the Philippines
            — by land, sea, or air.
          </BodyText>
        </div>
        <DomesticPetRelocationForm type={type || undefined} />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default DomesticPetRelocationFormScreen;
