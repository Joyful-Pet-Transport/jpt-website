import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import GrayCardContainer from "../containers/GrayCardContainer";
import BodyText from "../elements/text/BodyText";
import InfoItemContainer from "../containers/InfoItemContainer";
import IconContainer from "../containers/IconContainer";
import DynamicButton from "../elements/button/DynamicButton";
import InputBase from "../elements/input/TextInput/InputBase";
import SelectBase from "../elements/input/SelectInput/SelectBase";

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
              <InputBase
                keyboardType="paragraph"
                whiteLabel
                label="Kupal"
                placeholder="boboboobobo"
              />
              <SelectBase
                options={[
                  { label: "Food", value: "food" },
                  { label: "Transport", value: "transport" },
                ]}
                selectType="multi"
                whiteLabel
                label="Kupal"
                placeholder="boboboobobo"
              />
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.1523149329405!2d120.97726777594258!3d14.360595786097761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad761acc944e2d03%3A0xac2abd07f92c8d03!2sJoyful%20International%20and%20Domestic%20Pet%20Transport%20and%20Pet%20Care%20Services!5e0!3m2!1sen!2sph!4v1769349936524!5m2!1sen!2sph"
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
