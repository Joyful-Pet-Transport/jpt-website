"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import DomesticPetRelocationForm from "@/components/forms/DomesticPetRelocationForm";
import RabiesSerologyTestForm from "@/components/forms/RabiesSerologyTestForm";

const RabiesSerologyTestFormScreen = () => {
  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[
          {
            label: "Rabies Serology Test",
            path: "/our-services/rabies-serology-test",
          },
          { label: "Form" },
        ]}
      />
      <BoxedContainer medium>
        <div className="text-center">
          <Heading size="medium" font="fredoka" className="uppercase">
            rabies serology test
          </Heading>
          <BodyText>
            For pets traveling to countries that require this test, we make the
            process easy.
          </BodyText>
        </div>
        <RabiesSerologyTestForm />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default RabiesSerologyTestFormScreen;
