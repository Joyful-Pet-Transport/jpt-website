import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import GrayCardContainer from "../containers/GrayCardContainer";
import BodyText from "../elements/text/BodyText";
import InfoItemContainer from "../containers/InfoItemContainer";
import IconContainer from "../containers/IconContainer";
import DynamicButton from "../elements/button/DynamicButton";
import InputBase from "../elements/input/TextInput/InputBase";
import { useIsMobile, useIsTablet } from "@/utils/hooks/useWindowsDimensions";
import ContactUsCard from "../forms/ContactUsForm";

const ContactUsSection: FC = () => {
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const ContactUs: FC = () => {
    return (
      <div
        className={`flex ${mobile || tablet ? "flex-col" : "flex-row"} gap-10 w-full`}
      >
        <div
          className={`flex flex-col ${mobile || tablet ? "w-full" : "flex-1"}`}
        >
          <div className={`mb-6 ${mobile || tablet ? "text-center" : ""}`}>
            <Heading font="fredoka" className="uppercase">
              Feel free to contact us
            </Heading>
            <BodyText className="mt-2">
              Have questions about your pet’s journey? We’re here to help! Feel
              free to reach out to us anytime. Our team is happy to assist you
              and make your pet’s relocation as smooth and stress-free as
              possible.
            </BodyText>
          </div>
          <div className="flex flex-col gap-4">
            <InfoItemContainer
              icon={<IconContainer icon="location2" />}
              name="Address"
              value="Block 10 Lot 7 Woodpecker St. Avida Residences Salawag Dasmariñas 4114 Cavite"
            />
            <InfoItemContainer
              icon={<IconContainer icon="email" />}
              name="Email"
              value="joyfultransportreservations@gmail.com"
            />
            <InfoItemContainer
              icon={<IconContainer icon="phone" />}
              name="Phone"
              value="+63 993 370 3770"
            />
            <InfoItemContainer
              icon={<IconContainer icon="clock" />}
              name="Business Hours"
              value="Monday - Saturday (10:00 AM - 7:00 PM PHT)"
            />
          </div>
        </div>
        <div className={mobile ? "w-full" : ""}>
          <ContactUsCard />
        </div>
      </div>
    );
  };

  const Location: FC = () => {
    return (
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
    );
  };

  return (
    <BoxedContainer>
      <ContactUs />
      <Location />
    </BoxedContainer>
  );
};

export default ContactUsSection;
