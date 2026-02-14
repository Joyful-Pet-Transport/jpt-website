"use client";

import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import DynamicButton from "../elements/button/DynamicButton";
import SocialButtons from "./SocialButtons";
import { navItems } from "@/utils/config/navItems";

const Footer: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const Brand = () => {
    return (
      <div className="flex flex-col gap-6">
        <div onClick={() => router.push("/")} className="w-full">
          <Image
            src="/images/logo/footer-bg.png"
            width={500}
            height={200}
            alt="Logo"
            priority
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <BodyText size="small" weight="semibold">
              Welcome!
            </BodyText>
            <BodyText size="small" weight="semibold">
              We offer safe, reliable, and seamless pet transport services,
              ensuring your companions travel with comfort and care—locally and
              internationally.
            </BodyText>
          </div>
          <BodyText size="small" weight="semibold">
            Get in touch with us today to begin your pet’s journey.
          </BodyText>
        </div>
        <div className="mx-auto">
          <DynamicButton className="min-w-80" rounded>
            get in touch with us
          </DynamicButton>
        </div>
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
              className={
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path))
                  ? "text-blue-500!"
                  : ""
              }
              weight="thin"
              size="small"
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
          <BodyText
            size="small"
            weight="thin"
            onPress={() =>
              router.push("/OurServices/international-pet-relocation")
            }
          >
            International Pet Relocation
          </BodyText>
          <div className="flex flex-col pl-8">
            <BodyText size="small" weight="thin">
              Import to Philippines
            </BodyText>
            <BodyText weight="thin" size="small">
              Export from Philippines
            </BodyText>
          </div>
          <BodyText
            weight="thin"
            size="small"
            onPress={() => router.push("/OurServices/domestic-pet-relocation")}
          >
            Domestic Pet Relocation
          </BodyText>
          <div className="flex flex-col pl-8">
            <BodyText weight="thin" size="small">
              Land & Sea Travel
            </BodyText>
            <BodyText weight="thin" size="small">
              Air Travel
            </BodyText>
          </div>
          <BodyText
            size="small"
            weight="thin"
            onPress={() => router.push("/OurServices/rabies-serology-test")}
          >
            Rabies Serology Test
          </BodyText>
        </div>
      </div>
    );
  };

  const ContactUs = () => {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          <BodyText weight="semibold">CONTACT US NOW!</BodyText>
          <div>
            <BodyText weight="thin" size="small">
              Email Address:
            </BodyText>
            <div className="flex flex-col pl-8">
              <BodyText weight="thin" size="small">
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
              <BodyText weight="thin" size="small">
                GOMO:
              </BodyText>
              <BodyText weight="thin" size="small">
                DITO:
              </BodyText>
              <BodyText weight="thin" size="small">
                SMART:
              </BodyText>
              <BodyText weight="thin" size="small">
                GLOBE:
              </BodyText>
            </div>
            <div>
              <BodyText weight="thin" size="small">
                +63 976 630 8124
              </BodyText>
              <BodyText weight="thin" size="small">
                +63 993 370 3770
              </BodyText>
              <BodyText weight="thin" size="small">
                N/A
              </BodyText>
              <BodyText weight="thin" size="small">
                +63 956 810 1871 / +63 966 940 6263
              </BodyText>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SocialIcons: FC = () => {
    return (
      <div className="flex w-full justify-center flex-col gap-2">
        <BodyText className="text-center" size="base">
          Trusted by Hundreds of Furparents
        </BodyText>
        <div className="flex flex-1 justify-center flex-row gap-4 items-center">
          <SocialButtons />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center mb-2 gap-2 mt-8">
      <div className="bg-[#EAEAEA] rounded-4xl mx-8 p-16 flex flex-col flex-1 relative">
        <div className="flex flex-row gap-6">
          <div className="w-1/3">
            <Brand />
          </div>
          <div className="flex px-16 flex-row justify-center flex-1 gap-4">
            <Navigation />
            <Services />
            <ContactUs />
          </div>
        </div>
        <div className="absolute right-0 left-0 bottom-6 z-1">
          <SocialIcons />
        </div>
        <div className="absolute left-1/4 bottom-0 w-1/3">
          <Image
            src="/images/element/vector.svg"
            width={100}
            height={40}
            alt="Logo"
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
      <BodyText className="text-center" textColor="text-neutral-600">
        © 2026 Joyful Pet Transport | All rights reserved.
      </BodyText>
    </div>
  );
};

export default Footer;
