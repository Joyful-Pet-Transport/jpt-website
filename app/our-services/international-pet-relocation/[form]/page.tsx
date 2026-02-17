"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import InternationalPetRelocationForm from "@/components/forms/InternationalPetTransportForm";
import { useParams } from "next/navigation";

const InternationalPetRelocationFormScreen = () => {
  const { form } = useParams();

  if (!form) return;

  const formLabel = Array.isArray(form) ? form.join("/") : form;

  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[
          {
            label: "International Pet Relocation",
            path: "/our-services/international-pet-relocation",
          },
          { label: formLabel + " Form" },
        ]}
      />
      <BoxedContainer medium>
        <div className="text-center">
          <Heading size="medium" font="fredoka" className="uppercase">
            {formLabel} international Pet Relocation form
          </Heading>
          <BodyText>
            Answer the form to start your pet’s relocation journey.
          </BodyText>
        </div>
        <InternationalPetRelocationForm type={formLabel} />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default InternationalPetRelocationFormScreen;
