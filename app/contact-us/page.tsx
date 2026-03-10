"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import InfoItemContainer from "@/components/containers/InfoItemContainer";
import IconContainer from "@/components/containers/IconContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";
import { FC } from "react";
import ContactUs from "@/components/forms/ContactUsForm";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const ContactUsScreen = () => {
  const mobile = useIsMobile();

  const Location: FC = () => {
    return (
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <Heading font="fredoka" size="medium" className="text-center">
            Find Us
          </Heading>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=joyfulpettransportreservations@gmail.com&su=${encodeURIComponent(
              "I would like to Inquire",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light hover:text-blue-600 transition break-all"
          >
            <BodyText size="small" className="text-center">
              joyfulpettransportreservations@gmail.com
            </BodyText>
          </a>
        </div>

        <div className="flex flex-1 w-full rounded-3xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.1523149329405!2d120.97726777594258!3d14.360595786097761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad761acc944e2d03%3A0xac2abd07f92c8d03!2sJoyful%20International%20and%20Domestic%20Pet%20Transport%20and%20Pet%20Care%20Services!5e0!3m2!1sen!2sph!4v1769349936524!5m2!1sen!2sph"
            width={mobile ? "100%" : ""}
            height={mobile ? "400" : "560"}
            style={{ border: 0, flex: 1 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
  };
  return (
    <PageWrapperContainer>
      <Breadcrumbs
        items={[{ label: "Home", path: "/" }, { label: "Contact Us" }]}
      />
      <BoxedContainer medium className="flex justify-center">
        <div className="items-center justify-center flex flex-col gap-6">
          <Heading font="fredoka">Contact Us</Heading>
          <BodyText>
            Have a question or need assistance? Reach out to us directly and our
            team will be happy to help you.
          </BodyText>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
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
                      onPress={() =>
                        window.open("http://m.me/joyfulpettransport", "_blank")
                      }
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="whatsapp" colored />}
                      name="WhatsApp"
                      value="Joyful Pet Transport"
                      onPress={() =>
                        window.open("https://wa.me/639289981020", "_blank")
                      }
                    />
                    {/* <InfoItemContainer
                      icon={<IconContainer icon="telegram" colored />}
                      name="Telegram"
                      value="Joyful Pet Transport"
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="viber" colored />}
                      name="Viber"
                      value="Joyful Pet Transport"
                    /> */}
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
                      onPress={() =>
                        window.open(
                          "https://www.facebook.com/joyfulpettransport",
                          "_blank",
                        )
                      }
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="instagram" colored />}
                      name="Instagram"
                      value="Joyful Pet Transport"
                      onPress={() =>
                        window.open(
                          "https://www.instagram.com/joyfulpettransport",
                          "_blank",
                        )
                      }
                    />
                    <InfoItemContainer
                      icon={<IconContainer icon="tiktok" colored />}
                      name="Tiktok"
                      value="Joyful Pet Transport"
                      onPress={() =>
                        window.open(
                          "https://www.tiktok.com/@joyfulpettransport",
                          "_blank",
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <BodyText
                font="poppins"
                weight="semibold"
                size="medium"
                className="text-center"
              >
                Quick Inquiry
              </BodyText>
              <BodyText
                font="poppins"
                weight="semibold"
                className="text-center"
              >
                Use our short inquiry form—your message goes straight to our
                email.
              </BodyText>
            </div>
            <ContactUs />
          </div>
        </div>
        <Location />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default ContactUsScreen;
