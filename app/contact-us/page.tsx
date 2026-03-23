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
import { shareNumber } from "@/components/contents/Footer";
import Image from "next/image";

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
          <BodyText className="text-center">
            Have a question or need assistance? Reach out to us directly and our
            team will be happy to help you.
          </BodyText>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col gap-4">
              <BodyText
                font="fredoka"
                weight="semibold"
                size="medium"
                className="text-center"
              >
                Reach Us Anytime
              </BodyText>
              <BodyText
                font="poppins"
                weight="semibold"
                className="text-center"
              >
                You may reach us through any of the platforms listed below.
              </BodyText>
            </div>
            <div className="flex flex-1 flex-col gap-8 pt-4">
              <div className="flex gap-4 w-full flex-row">
                <div className="flex flex-1 flex-col gap-6">
                  <BodyText font="fredoka" weight="semibold">
                    Messaging Apps
                  </BodyText>
                  <div className="flex flex-col gap-4">
                    <BodyText font="fredoka" weight="semibold">
                      Joyful Pet Transport
                    </BodyText>
                    <div className="flex gap-2 md:gap-4">
                      <IconContainer
                        icon="messenger"
                        colored
                        onPress={() =>
                          window.open(
                            "http://m.me/joyfulpettransport",
                            "_blank",
                          )
                        }
                      />
                      <IconContainer
                        icon="whatsapp"
                        colored
                        onPress={() =>
                          window.open("https://wa.me/639289981020", "_blank")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6">
                  <BodyText font="fredoka" weight="semibold">
                    Social Media
                  </BodyText>
                  <div className="flex flex-col gap-4">
                    <BodyText font="fredoka" weight="semibold">
                      Joyful Pet Transport
                    </BodyText>
                    <div className="flex gap-2 md:gap-4">
                      <IconContainer
                        icon="facebook"
                        colored
                        onPress={() =>
                          window.open(
                            "https://www.facebook.com/joyfulpettransport",
                            "_blank",
                          )
                        }
                      />
                      <IconContainer
                        icon="instagram"
                        colored
                        onPress={() =>
                          window.open(
                            "https://www.instagram.com/joyfulpettransport",
                            "_blank",
                          )
                        }
                      />
                      <IconContainer
                        icon="tiktok"
                        colored
                        onPress={() =>
                          window.open(
                            "https://www.tiktok.com/@joyfulpettransport",
                            "_blank",
                          )
                        }
                      />
                      <IconContainer
                        icon="youtube"
                        colored
                        onPress={() =>
                          window.open(
                            "https://www.youtube.com/channel/UCxF1iwT7pyEHydsYOpuo6_g",
                            "_blank",
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center flex py-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src="/images/icons/call-2.svg"
                    width={32}
                    height={32}
                    alt="Call Icon"
                  />
                  <BodyText weight="semibold">
                    Want to Talk? Please Call Us
                  </BodyText>
                </div>

                <div className="flex flex-col gap-2 text-sm font-light">
                  <button
                    onClick={() => shareNumber("GOMO", "+63 976 630 8124")}
                    className="text-left hover:text-blue-600 flex gap-2"
                  >
                    <BodyText
                      size="small"
                      font="fredoka"
                      weight="semibold"
                      className="w-16"
                    >
                      GOMO:
                    </BodyText>
                    <span>+63 976 630 8124</span>
                  </button>

                  <button
                    onClick={() => shareNumber("DITO", "+63 993 370 3770")}
                    className="text-left hover:text-blue-600 flex gap-2"
                  >
                    <BodyText
                      size="small"
                      font="fredoka"
                      weight="semibold"
                      className="w-16"
                    >
                      DITO:
                    </BodyText>
                    <span>+63 993 370 3770</span>
                  </button>

                  <div className="text-left hover:text-blue-600 flex gap-2">
                    <BodyText
                      size="small"
                      font="fredoka"
                      weight="semibold"
                      className="w-16"
                    >
                      GLOBE:
                    </BodyText>
                    <span>
                      <span
                        onClick={() => shareNumber("GLOBE", "+63 956 810 1871")}
                        className="whitespace-nowrap"
                      >
                        +63 956 810 1871
                      </span>
                      {" / "}
                      <span
                        onClick={() => shareNumber("GLOBE", "+63 966 940 6263")}
                        className="whitespace-nowrap"
                      >
                        +63 966 940 6263
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <BodyText
                font="fredoka"
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
