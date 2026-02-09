"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import InfoCards from "@/components/card/InfoCards";

const InternalPetRelocationScreen = () => {
  return (
    <PageWrapperContainer className="items-center">
      <BoxedContainer className="gap-10 flex flex-col" medium>
        <div className="justify-center items-center flex flex-col mx-auto gap-10">
          <Heading className="text-center">
            International Pet Relocation
          </Heading>
          <BodyText className="text-center w-220">
            Whether your pet is flying to the Philippines or travelling to a new
            country, we're here to take care of everything behind the scenes.
          </BodyText>
        </div>
        <div className="flex items-center justify-center gap-8">
          <InfoCards>
            <Heading size="medium" className="text-center" weight="semibold">
              Import
            </Heading>
            <BodyText className="text-center uppercase" weight="semibold">
              From abroad to Philippines
            </BodyText>
            <BodyText className="text-center">
              Detailed information about our international pet relocation
              services, including documentation, quarantine requirements, and
              travel arrangements to ensure a smooth journey for your beloved
              pet.
            </BodyText>
          </InfoCards>
          <InfoCards>
            <Heading size="medium" className="text-center" weight="semibold">
              Export
            </Heading>
            <BodyText className="text-center uppercase" weight="semibold">
              From Philippines to Abroad
            </BodyText>
            <BodyText className="text-center">
              If your pet is travelling from the Philippines to another country,
              we handle all preparations so their journey is smooth and
              comfortable. We coordinate with airlines, veterinarians, and
              travel partners to ensure everything goes according to plan.
            </BodyText>
          </InfoCards>
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default InternalPetRelocationScreen;
