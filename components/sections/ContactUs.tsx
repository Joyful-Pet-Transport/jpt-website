import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import GrayCardContainer from "../containers/GrayCardContainer";
import BodyText from "../elements/text/BodyText";
import InfoItemContainer from "../containers/InfoItemContainer";
import IconContainer from "../containers/IconContainer";
import DynamicButton from "../elements/button/DynamicButton";

const ContactUsSection: FC = () => {
  const ContactUs: FC = () => {
    return (
      <GrayCardContainer>
        <div className="flex w-full">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex gap-4 w-full flex-row">
              <div className="flex flex-1 flex-col gap-6">
                <BodyText white>OUR SOCIALS</BodyText>
                <div className="flex flex-col gap-4">
                  <InfoItemContainer
                    icon={<IconContainer icon="facebook" />}
                    name="Facebook"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="instagram" />}
                    name="Instagram"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="tiktok" />}
                    name="Tiktok"
                    value="Joyful Pet Transport"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <BodyText white>CONTACT US</BodyText>
                <div className="flex flex-col gap-4">
                  <InfoItemContainer
                    icon={<IconContainer icon="messenger" />}
                    name="Messenger"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="whatsapp" />}
                    name="WhatsApp"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="telegram" />}
                    name="Telegram"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="viber" />}
                    name="Viber"
                    value="Joyful Pet Transport"
                  />
                  <InfoItemContainer
                    icon={<IconContainer icon="call" />}
                    name="Phone Number"
                    value="Joyful Pet Transport"
                  />
                </div>
              </div>
            </div>
            <InfoItemContainer
              icon={<IconContainer icon="google" />}
              name="Email Address"
              value="joyfulpettransportreservations@gmail.com"
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <BodyText white>QUICK INQUIRY </BodyText>
            <div className="flex flex-col gap-4 h-full">
              <div className="bg-[#FEF5EE] rounded-xl flex-col flex flex-1">
                custom input to be continued
              </div>
              <DynamicButton size="medium" type="orange">
                SEND
              </DynamicButton>
            </div>
          </div>
        </div>
      </GrayCardContainer>
    );
  };

  const Location: FC = () => {
    return (
      <GrayCardContainer>
        <div className="flex flex-1 flex-col gap-4">
          <InfoItemContainer
            icon={<IconContainer icon="location" />}
            name="Location"
            value="This is my Address"
          />
          <div className="flex flex-1 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4870.046167389485!2d120.98104450323872!3d14.348685409669885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d41bb1b50519%3A0x432ebe655ed3fdd5!2sDasma%204%20Golden%20City%2C%20Dasmari%C3%B1as%2C%20Cavite!5e0!3m2!1sen!2sph!4v1768915019870!5m2!1sen!2sph"
              width="auto"
              height="450"
              style={{ border: 0, flex: 1 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </GrayCardContainer>
    );
  };

  return (
    <BoxedContainer className="py-12">
      <div className="flex flex-col items-center gap-10">
        <Heading size="medium" weight="semibold">
          Contact Us
        </Heading>
        <ContactUs />
        <Location />
      </div>
    </BoxedContainer>
  );
};

export default ContactUsSection;
