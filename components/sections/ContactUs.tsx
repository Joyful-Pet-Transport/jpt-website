import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import GrayCardContainer from "../containers/GrayCardContainer";
import BodyText from "../elements/text/BodyText";
import InfoItemContainer from "../containers/InfoItemContainer";

const ContactUsSection: FC = () => {
  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-center gap-10">
        <Heading size="medium" weight="semibold">
          Contact Us
        </Heading>
        <GrayCardContainer>
          <div className="flex w-full">
            <div className="flex flex-1">
              <div className="flex gap-4 w-full flex-row">
                <div className="flex flex-1 flex-col gap-8">
                  <BodyText white>OUR SOCIALS</BodyText>
                  <div className="flex flex-col gap-4">
                    <InfoItemContainer
                      icon={<div />}
                      name="Facebook"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<div />}
                      name="Facebook"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<div />}
                      name="Facebook"
                      value="Joyful Pet Transport"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <BodyText>OUR SOCIALS</BodyText>
                  <BodyText>OUR SOCIALS</BodyText>
                  <BodyText>OUR SOCIALS</BodyText>
                  <BodyText>OUR SOCIALS</BodyText>
                </div>
              </div>
            </div>
            <div className="flex flex-1"></div>
          </div>
        </GrayCardContainer>
      </div>
    </BoxedContainer>
  );
};

export default ContactUsSection;
