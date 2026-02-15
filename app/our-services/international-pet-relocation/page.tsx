"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import InfoCards from "@/components/card/InfoCards";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import DynamicButton from "@/components/elements/button/DynamicButton";
import { useRouter } from "next/navigation";

const InternalPetRelocationScreen = () => {
  const router = useRouter();

  const Import = () => {
    return (
      <InfoCards>
        <div>
          <BodyText
            size="large"
            className="text-center uppercase"
            weight="bold"
          >
            Import
          </BodyText>
          <BodyText className="text-center uppercase" weight="semibold">
            From abroad to Philippines
          </BodyText>
        </div>
        <div className="flex flex-col gap-2">
          <BodyText>
            When your pet is flying home, we manage all the coordination so you
            don’t have to.
          </BodyText>
          <BodyText>
            We take care of scheduling, clearances, airport assistance, and
            monitoring their arrival.
          </BodyText>
          <BodyText>
            If your pet is traveling alone, we also assist in receiving them and
            ensuring they are safely handed over to you.
          </BodyText>
        </div>
        <BodyText className="uppercase text-center" weight="semibold">
          Walkthrough:
        </BodyText>
        <div>
          <BodyText>1. You tell us your travel plans.</BodyText>
          <BodyText>
            2. We coordinate your pet’s travel schedule and all backend
            arrangements.
          </BodyText>
          <BodyText>3. We assist Customs Releasing.</BodyText>
          <BodyText>4. We assist you until your pet is safely home.</BodyText>
        </div>
        <DynamicButton
          onPress={() =>
            router.push("/our-services/international-pet-relocation/import")
          }
          className="self-center justify-end mt-auto"
        >
          Book Now
        </DynamicButton>
      </InfoCards>
    );
  };

  const Export = () => {
    return (
      <InfoCards>
        <div>
          <BodyText
            size="large"
            className="text-center uppercase"
            weight="bold"
          >
            Export
          </BodyText>
          <BodyText className="text-center uppercase" weight="semibold">
            From Philippines to Abroad
          </BodyText>
        </div>
        <BodyText>
          If your pet is travelling from the Philippines to another country, we
          handle all preparations so their journey is smooth and comfortable. We
          coordinate with airlines, veterinarians, and travel partners to ensure
          everything goes according to plan.
        </BodyText>
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
          onPress={() =>
            router.push("/our-services/international-pet-relocation/export")
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
            International Pet Relocation
          </Heading>
          <BodyText className="text-center">
            Whether your pet is flying to the Philippines or travelling to a new
            country, we're here to take care of everything behind the scenes.
          </BodyText>
        </div>
        <div className="flex justify-center gap-8">
          <Import />
          <Export />
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default InternalPetRelocationScreen;
