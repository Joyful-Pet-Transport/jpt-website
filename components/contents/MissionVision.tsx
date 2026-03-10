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
        <div
          style={{
            background: "linear-gradient(to right, #FFB18C, #E1E1E3, #6EC9FF)",
          }}
          className="flex flex-col items-center justify-center bg-neutral-100 rounded-xl px-8 py-12 md:px-10 md:py-14 shadow-lg"
        >
          <Heading weight="semibold" size="medium" className="pb-4 text-center">
            OUR MISSION
          </Heading>
          <BodyText className="text-center">
            To provide safe, reliable, and compassionate pet relocation services
            while ensuring every pet travels comfortably and every furparent
            experiences a smooth and worry-free process.
          </BodyText>
        </div>

        <div
          style={{
            background: "linear-gradient(to right, #FFB18C, #E1E1E3, #6EC9FF)",
          }}
          className="flex flex-col items-center justify-center bg-neutral-100 rounded-xl px-8 py-12 md:px-10 md:py-14 shadow-lg"
        >
          <Heading weight="semibold" size="medium" className="pb-4 text-center">
            OUR VISION
          </Heading>
          <BodyText className="text-center">
            To become a trusted and recognized leader in pet transport services
            by delivering personalized, dependable, and high-quality relocation
            solutions for pets across the Philippines and around the world.
          </BodyText>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
