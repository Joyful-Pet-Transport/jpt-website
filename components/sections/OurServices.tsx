import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";

const OurServices: FC = () => {
  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-center justify-center w-full">
        <Heading weight="semibold" size="medium">
          OUR SERVICES
        </Heading>
        <div className="w-full flex gap-8"></div>
      </div>
    </BoxedContainer>
  );
};

export default OurServices;
