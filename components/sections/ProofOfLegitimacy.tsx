import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";

const ProofOfLegitimacy: FC = () => {
  return (
    <BoxedContainer medium className="py-12">
      <div className="flex flex-col gap-10">
        <div className="w-full flex flex-col items-center">
          <Heading weight="semibold" size="medium">
            PROOF OF LEGITIMACY
          </Heading>
        </div>
        <div className="flex gap-4">
          <div className="w-3/5 aspect-video rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              width="560"
              height="315"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col p-8 gap-8 flex-1 bg-[#FEF5EE] rounded-lg">
            <BodyText size="medium" weight="semibold">
              Title
            </BodyText>
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat{" "}
            </BodyText>
          </div>
        </div>
      </div>
    </BoxedContainer>
  );
};

export default ProofOfLegitimacy;
