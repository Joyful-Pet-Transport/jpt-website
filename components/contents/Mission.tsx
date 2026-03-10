import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";

const Mission: FC = () => {
  return (
    <div
      className="flex flex-col justify-center items-center rounded-xl px-8 md:px-12 py-16 md:py-24 mt-8 md:mt-32 shadow-lg"
      style={{
        background: "linear-gradient(to right, #FFB18C, #E1E1E3, #6EC9FF)",
      }}
    >
      <Heading weight="semibold" size="medium" className="pb-6">
        OUR MISSION
      </Heading>
      <BodyText className="text-center">
        To make pet travel simple, stress-free, and accessible for all
        furparents—whether traveling locally or across the globe.
      </BodyText>
    </div>
  );
};

export default Mission;
