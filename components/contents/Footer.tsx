import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <div>
      <BoxedContainer>
        <div className="flex flex-row justify-center gap-24 py-8">
          {/* brand */}
          <div className="flex flex-col gap-2 justify-center items-center w-48">
            <BodyText className="text-center" size="medium" weight="semibold">
              Joyful Pet Transport
            </BodyText>
            <Image
              src="/images/logo/logo.png"
              width={75}
              height={75}
              alt="Logo"
              priority
            />
            <BodyText className="text-center">
              Copyright © 2025 Doneyt. All rights reserved.
            </BodyText>
          </div>
          {/* navigation */}
          <div className="flex flex-row gap-24">
            <div className="flex flex-col gap-8">
              <BodyText size="medium" weight="semibold">
                Pages
              </BodyText>
              <div className="flex flex-col gap-2">
                <BodyText onPress={() => {}}>Our Services</BodyText>
                <BodyText onPress={() => {}}>About Us</BodyText>
                <BodyText onPress={() => {}}>FAQs</BodyText>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <BodyText size="medium" weight="semibold">
                Our Socials
              </BodyText>
              <div className="flex flex-col gap-2">
                <BodyText onPress={() => {}}>Facebook</BodyText>
                <BodyText onPress={() => {}}>Instagram</BodyText>
                <BodyText onPress={() => {}}>Tiktok</BodyText>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <BodyText size="medium" weight="semibold">
                Contact Us
              </BodyText>
              <div className="flex flex-col gap-2">
                <BodyText onPress={() => {}}>Messenger</BodyText>
                <BodyText onPress={() => {}}>WhatsApp</BodyText>
                <BodyText onPress={() => {}}>Telegram</BodyText>
                <BodyText onPress={() => {}}>Viber</BodyText>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <BodyText size="medium" weight="semibold">
                  Location
                </BodyText>
                <BodyText>1234 Street Name, City, Country</BodyText>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <BodyText>Email</BodyText>
                  <BodyText onPress={() => {}}>
                    joyfulpettransportreservations@gmail.com
                  </BodyText>
                </div>
                <div>
                  <BodyText>Phone Number</BodyText>
                  <BodyText onPress={() => {}}>+639933707300</BodyText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BoxedContainer>
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #6EB2BC, #6DCA9E)",
        }}
        className="h-2.5 w-full"
      />
    </div>
  );
};

export default Footer;
