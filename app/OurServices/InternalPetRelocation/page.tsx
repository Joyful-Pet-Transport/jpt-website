"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";

const InternalPetRelocationScreen = () => {
  return (
    <PageWrapperContainer className="items-center">
      <BoxedContainer medium>
        <div className="justify-center items-center flex flex-col mx-auto">
          <Heading className="text-center">
            International Pet Relocation
          </Heading>
          <BodyText className="text-center mt-10">
            Whether your pet is flying to the Philippines or travelling to a new
            country, we're here to take care of everything behind the scenes.
          </BodyText>
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default InternalPetRelocationScreen;
