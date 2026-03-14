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

const DomesticPetRelocation = () => {
  const router = useRouter();

  const RenderDomesticPetRelocation: FC = () => {
    return (
      <InfoCards>
        <div>
          <BodyText
            size="large"
            className="text-center uppercase"
            weight="bold"
          >
            Transport Within the Philippines
          </BodyText>
        </div>
        <div className="flex flex-col gap-2">
          <BodyText>
            Whether you’re moving home or planning a trip, we carefully arrange
            your pet’s door-to-door journey.
          </BodyText>
          <BodyText>
            Your pet’s comfort and safety are our top priority.
          </BodyText>
        </div>
        <BodyText className="uppercase text-center" weight="semibold">
          Walkthrough:
        </BodyText>
        <div>
          <BodyText>1. Tell us your pick-up and drop-off locations.</BodyText>
          <BodyText>
            2. We plan the best transport route (land/sea/air).
          </BodyText>
          <BodyText>
            3. We coordinate schedules with you and our transport partners.
          </BodyText>
          <BodyText>
            4. We deliver your pet safely to your chosen destination.
          </BodyText>
        </div>
        <DynamicButton
          size="medium"
          onPress={() =>
            router.push("/our-services/domestic-pet-relocation/form")
          }
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
          { label: "International Pet Relocation" },
        ]}
      />
      <BoxedContainer>
        <div className="justify-center items-center flex flex-col gap-10">
          <Heading className="text-center uppercase" font="fredoka">
            domestic pet Relocation
          </Heading>
          <BodyText className="text-center">
            A safe, convenient way to move pets anywhere within the Philippines
            — by land, sea, or air.
          </BodyText>
        </div>
        <RenderDomesticPetRelocation />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default DomesticPetRelocation;
