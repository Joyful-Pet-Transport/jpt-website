"use client";

import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import DynamicButton from "../elements/button/DynamicButton";
import SocialButton from "../elements/button/SocialButton";
import SocialButtons from "./SocialButtons";
import { navItems } from "@/utils/config/navItems";

const Footer: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const Brand = () => {
    return (
      <div className="flex flex-col items-center gap-6">
        <div onClick={() => router.push("/")}>
          <Image
            src="/images/logo/logo-new.png"
            width={128}
            height={128}
            alt="Logo"
            priority
          />
        </div>
        <div className="px-12 flex flex-col gap-6">
          <div>
            <BodyText className="text-center">Welcome!</BodyText>
            <BodyText className="text-center">
              We offer safe, reliable, and seamless pet transport services,
              ensuring your companions travel with comfort and care—locally and
              internationally.
            </BodyText>
          </div>
          <BodyText className="text-center" weight="semibold">
            Get in touch with us today to begin your pet’s journey.
          </BodyText>
        </div>
        <DynamicButton rounded size="medium">
          contact us
        </DynamicButton>
      </div>
    );
  };

  const Navigation = () => {
    return (
      <div className="flex flex-col gap-4 w-full">
        <BodyText weight="semibold">NAVIGATION</BodyText>
        <div className="flex flex-col">
          {navItems.map((item) => (
            <BodyText
              key={item.path}
              onPress={() => router.push(item.path)}
              className={pathname === item.path ? "text-blue-500!" : ""}
              weight="thin"
            >
              {item.label}
            </BodyText>
          ))}
        </div>
      </div>
    );
  };

  const Services = () => {
    return (
      <div className="flex flex-col gap-4 w-full">
        <BodyText weight="semibold">OUR SERVICES</BodyText>
        <div>
          <BodyText weight="thin">International Pet Relocation</BodyText>
          <div className="flex flex-col pl-8">
            <BodyText weight="thin">Import to Philippines</BodyText>
            <BodyText weight="thin">Export from Philippines</BodyText>
          </div>
          <BodyText weight="thin">Domestic Pet Relocation</BodyText>
          <div className="flex flex-col pl-8">
            <BodyText weight="thin">Land & Sea Travel</BodyText>
            <BodyText weight="thin">Air Travel</BodyText>
          </div>
        </div>
      </div>
    );
  };

  const ContactUs = () => {
    return (
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-4 w-full">
          <BodyText weight="semibold">CONTACT US NOW!</BodyText>
          <div>
            <BodyText weight="thin">Email Address:</BodyText>
            <div className="flex flex-col pl-8">
              <BodyText weight="thin">
                joyfulpettransportreservations@gmail.com
              </BodyText>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div>
              <BodyText weight="semibold">WANT TO TALK?</BodyText>
              <BodyText weight="semibold">PLEASE CALL US</BodyText>
            </div>
            <Image
              src="/images/icons/call-2.svg"
              width={42}
              height={42}
              alt="Logo"
              priority
            />
          </div>
          <div className="flex flex-row gap-4">
            <div>
              <BodyText weight="thin">GOMO:</BodyText>
              <BodyText weight="thin">DITO:</BodyText>
              <BodyText weight="thin">SMART:</BodyText>
              <BodyText weight="thin">GLOBE:</BodyText>
            </div>
            <div>
              <BodyText weight="thin">+63 976 630 8124</BodyText>
              <BodyText weight="thin">+63 993 370 3770</BodyText>
              <BodyText weight="thin">N/A</BodyText>
              <BodyText weight="thin">
                +63 956 810 1871 / +63 966 940 6263
              </BodyText>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center mb-2 gap-2 mt-8">
      <div className="bg-[#EAEAEA] rounded-4xl mx-8 p-8 flex flex-col flex-1">
        <div className="flex flex-row gap-6">
          <div className="w-1/4">
            <Brand />
          </div>
          <div className="flex p-8 flex-row flex-1 gap-4">
            <div className="flex flex-row gap-4 w-full">
              <Navigation />
              <Services />
            </div>
            <ContactUs />
          </div>
        </div>
        <div className="flex w-full justify-center flex-col gap-2">
          <BodyText className="text-center">
            Trusted by Hundreds of Furparents
          </BodyText>
          <div className="flex flex-1 justify-center flex-row gap-4 items-center">
            <SocialButtons />
          </div>
        </div>
      </div>
      <BodyText className="text-center" textColor="text-neutral-600">
        © 2026 Joyful Pet Transport | All rights reserved.
      </BodyText>
    </div>
  );
};

export default Footer;
