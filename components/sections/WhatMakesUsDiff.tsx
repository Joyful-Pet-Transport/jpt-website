import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const WhatMakesUsDiff: FC = () => {
  return (
  <BoxedContainer className="py-12 mt-32">
      <div className="flex flex-col items-center justify-center w-full gap-24">
        <Heading weight="semibold" size="medium">
          WHAT MAKES US DIFFERENT
        </Heading>
        <div> 
          <Image
            src={"/images/element/Logowborder.png"}
            alt="Joyful Pet Transport"
            width={500}
            height={500}
          />
          </div>
       
      </div>
    </BoxedContainer>

  );
};

export default WhatMakesUsDiff;
