import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";

const MissionVision: FC = () => {
  return (
    <section className="w-full mt-12 px-4">
      <Heading font="fredoka" weight="semibold" className="text-center mb-12">
        OUR MISSION & VISION
      </Heading>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-neutral-100 rounded-xl px-8 py-12 md:px-10 md:py-14 shadow-lg">
          <Heading weight="semibold" size="medium" className="pb-4 text-center">
            OUR MISSION
          </Heading>
          <BodyText className="text-center">
            To make pet travel simple, stress-free, and accessible for all
            furparents—whether traveling locally or across the globe.
          </BodyText>
        </div>

        <div className="flex flex-col items-center justify-center bg-neutral-100 rounded-xl px-8 py-12 md:px-10 md:py-14 shadow-lg">
          <Heading weight="semibold" size="medium" className="pb-4 text-center">
            OUR VISION
          </Heading>
          <BodyText className="text-center">
            To make pet travel simple, stress-free, and accessible for all
            furparents—whether traveling locally or across the globe.
          </BodyText>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
