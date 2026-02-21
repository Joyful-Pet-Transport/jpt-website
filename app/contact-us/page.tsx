"use client";
import BoxedContainer from "@/components/containers/BoxedContainer";
import InfoItemContainer from "@/components/containers/InfoItemContainer";
import IconContainer from "@/components/containers/IconContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import InputBase from "@/components/elements/input/TextInput/InputBase";
import { FC } from "react";

const ContactUsScreen = () => {
  const Location: FC = () => {
    return (
      <div className="flex flex-col w-full overflow-hidden">
        <BodyText
          font="poppins"
          size="medium"
          weight="semibold"
          className="text-center"
        >
          Our Location
        </BodyText>

        <BodyText className="text-center">
          joyfulpettransportreservations@gmail.com
        </BodyText>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.1523149329405!2d120.97726777594258!3d14.360595786097761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad761acc944e2d03%3A0xac2abd07f92c8d03!2sJoyful%20International%20and%20Domestic%20Pet%20Transport%20and%20Pet%20Care%20Services!5e0!3m2!1sen!2sph!4v1769349936524!5m2!1sen!2sph"
          width="100%"
          height="560"
          style={{ border: 0, paddingTop: 20 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  };
  return (
    <PageWrapperContainer removeBg disableLayout>
      <BoxedContainer medium className="flex items-center justify-center">
        <div className="items-center justify-center flex flex-col gap-6">
          <Heading font="poppins">Contact Us</Heading>
          <BodyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
            dolor sit amet, consectetur
          </BodyText>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <BodyText
              className="text-center"
              font="poppins"
              weight="semibold"
              size="medium"
            >
              Reach Us Anytime
            </BodyText>
            <div className="flex flex-1 flex-col gap-8 pt-4">
              <div className="flex gap-4 w-full flex-row">
                <div className="flex flex-1 flex-col gap-6">
                  <BodyText font="poppins" weight="semibold">
                    Messaging Apps
                  </BodyText>
                  <div className="flex flex-col gap-4">
                    <InfoItemContainer
                      icon={<IconContainer icon="messenger" colored />}
                      name="Messenger"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="whatsapp" colored />}
                      name="WhatsApp"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="telegram" colored />}
                      name="Telegram"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="viber" colored />}
                      name="Viber"
                      value="Joyful Pet Transport"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6">
                  <BodyText font="poppins" weight="semibold">
                    Social Media
                  </BodyText>
                  <div className="flex flex-col gap-4">
                    <InfoItemContainer
                      icon={<IconContainer icon="facebook" colored />}
                      name="Facebook"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="instagram" colored />}
                      name="Instagram"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="tiktok" colored />}
                      name="Tiktok"
                      value="Joyful Pet Transport"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <InfoItemContainer
                  icon={<IconContainer icon="call3" />}
                  name="Phone Number"
                  value="Joyful Pet Transport"
                />
                <InfoItemContainer
                  icon={<IconContainer icon="google3" />}
                  name="Email Address"
                  value="joyfulpettransportreservations@gmail.com"
                />
              </div>
            </div>
          </div>
          <div className="p-2">
            <BodyText font="poppins" weight="semibold" size="medium">
              Quick Inquiry
            </BodyText>
            <BodyText font="poppins" weight="semibold">
              Use our short inquiry form—your message goes straight to our
              email.
            </BodyText>
            <div>
              <InputBase
                keyboardType="paragraph"
                label=""
                placeholder="Your message..."
                widthFull
              />
            </div>
          </div>
        </div>
        <Location />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default ContactUsScreen;
