"use client";

import InfoCards from "@/components/card/InfoCards";
import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import DynamicButton from "@/components/elements/button/DynamicButton";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import { useRouter } from "next/navigation";
import { FC } from "react";

const RabiesSerologyTestScreen = () => {
  const router = useRouter();

  const RenderPetSerologyTest: FC = () => {
    return (
      <InfoCards>
        <div>
          <BodyText
            size="large"
            className="text-center uppercase"
            weight="bold"
          >
            rabies antibody testing
          </BodyText>
        </div>
        <div className="flex flex-col gap-2">
          <BodyText>
            Whether you’re preparing for international travel or completing
            import requirements, we carefully arrange your pet’s Rabies Antibody
            (Titer) Testing process from start to finish.
          </BodyText>
          <BodyText>
            Your pet’s comfort and safety are our top priority.
          </BodyText>
        </div>
        <BodyText className="uppercase text-center" weight="semibold">
          Walkthrough:
        </BodyText>
        <div>
          <BodyText>
            1. Send us your pet’s updated rabies vaccination record.
          </BodyText>
          <BodyText>
            2. We schedule the blood extraction with an accredited veterinarian.
          </BodyText>
          <BodyText>
            3. The blood sample is prepared and sent to an approved laboratory
            for Rabies Antibody (Titer) Testing.
          </BodyText>
          <BodyText>
            4. We monitor the results and guide you on the next steps once the
            antibody level meets the required standard.
          </BodyText>
        </div>
        <DynamicButton
          size="medium"
          onPress={() => router.push("/our-services/rabies-serology-test/form")}
          className="self-center justify-end mt-auto"
        >
          Book Now
        </DynamicButton>
      </InfoCards>
    );
  };

  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[
          { label: "Our Services", path: "/our-services" },
          { label: "Rabies Serology Test" },
        ]}
      />
      <BoxedContainer>
        <div className="justify-center items-center flex flex-col gap-10">
          <Heading className="text-center uppercase" font="fredoka">
            rabies serology test
          </Heading>
          <BodyText className="text-center">
            For pets traveling to countries that require this test, we make the
            process easy.
          </BodyText>
        </div>
        <RenderPetSerologyTest />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default RabiesSerologyTestScreen;
