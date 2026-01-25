import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import OurServiceContents from "../contents/OurServiceContents";

const OurServicesSection: FC = () => {
  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <Heading weight="semibold" size="medium">
          OUR SERVICES
        </Heading>
        <OurServiceContents />
      </div>
    </BoxedContainer>
  );
};

export default OurServicesSection;
