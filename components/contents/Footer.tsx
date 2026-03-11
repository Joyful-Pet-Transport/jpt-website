"use client";

import { FC, useEffect } from "react";
import BodyText from "../elements/text/BodyText";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import DynamicButton from "../elements/button/DynamicButton";
import SocialButtons from "./SocialButtons";
import { navItems } from "@/utils/config/navItems";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { handleContactClick } from "@/lib/utils";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import AuthButton from "./AuthButtons";

const Footer: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const responsive = useResponsive();

  const email = "joyfulpettransportreservations@gmail.com";

  // const Brand = () => {
  const Brand: FC<{ hideButton?: boolean }> = ({ hideButton }) => {
    return (
      <div className="flex flex-col gap-6">
        <div onClick={() => router.push("/")} className="w-full cursor-pointer">
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
          <BodyText size="small" weight="semibold">
            Welcome!
          </BodyText>
          <BodyText size="small" weight="semibold">
            We offer safe, reliable, and seamless pet transport services,
            ensuring your companions travel with comfort and care—locally and
            internationally.
          </BodyText>
          <BodyText size="small" weight="semibold">
            Get in touch with us today to begin your pet’s journey.
          </BodyText>
        </div>

        {/* ✅ Functional Button */}
        <div className="w-full sm:w-auto">
          <DynamicButton
            onPress={() => router.push("/contact-us")}
            className="w-full sm:min-w-80"
            rounded
          >
            Get in Touch With Us
          </DynamicButton>
        </div>
      </div>
    );
  };

  const Navigation = () => {
    return (
      <div className="flex flex-col gap-4 w-full">
        <BodyText weight="semibold">NAVIGATION</BodyText>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <BodyText
              key={item.path}
              onPress={() => router.push(item.path)}
              className={`cursor-pointer hover:text-blue-600 transition ${
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path))
                  ? "text-blue-600!"
                  : ""
              }`}
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

        <div className="flex flex-col gap-2">
          <BodyText
            size="small"
            weight="thin"
            className="cursor-pointer hover:text-blue-600 transition"
            onPress={() =>
              router.push("/our-services/international-pet-relocation")
            }
          >
            International Pet Relocation
          </BodyText>

          <div className="flex flex-col pl-6 gap-2">
            <BodyText
              size="small"
              weight="thin"
              className="cursor-pointer hover:text-blue-600 transition"
              onPress={() =>
                router.push("/our-services/international-pet-relocation/import")
              }
            >
              Import to Philippines
            </BodyText>

            <BodyText
              size="small"
              weight="thin"
              className="cursor-pointer hover:text-blue-600 transition"
              onPress={() =>
                router.push("/our-services/international-pet-relocation/export")
              }
            >
              Export from Philippines
            </BodyText>
          </div>

          <BodyText
            size="small"
            weight="thin"
            className="cursor-pointer hover:text-blue-600 transition"
            onPress={() => router.push("/our-services/domestic-pet-relocation")}
          >
            Domestic Pet Relocation
          </BodyText>

          <div className="flex flex-col pl-6 gap-2">
            <BodyText
              weight="thin"
              size="small"
              className="cursor-pointer hover:text-blue-600 transition"
              onPress={() =>
                router.push(
                  "/our-services/domestic-pet-relocation/form?type=land",
                )
              }
            >
              Land Travel
            </BodyText>
            <BodyText
              weight="thin"
              size="small"
              className="cursor-pointer hover:text-blue-600 transition"
              onPress={() =>
                router.push(
                  "/our-services/domestic-pet-relocation/form?type=sea",
                )
              }
            >
              Sea Travel
            </BodyText>
            <BodyText
              weight="thin"
              size="small"
              className="cursor-pointer hover:text-blue-600 transition"
              onPress={() =>
                router.push(
                  "/our-services/domestic-pet-relocation/form?type=air",
                )
              }
            >
              Air Travel
            </BodyText>
          </div>

          <BodyText
            size="small"
            weight="thin"
            className="cursor-pointer hover:text-blue-600 transition"
            onPress={() => router.push("/our-services/rabies-serology-test")}
          >
            Rabies Serology Test
          </BodyText>
        </div>
      </div>
    );
  };

  const ContactUs = () => {
    const shareNumber = async (label: string, number: string) => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Contact Number",
            text: `${label}: ${number}`,
          });
        } catch (err) {
          console.error("Share cancelled", err);
        }
      }
    };

    return (
      <div className="flex flex-col gap-6 w-full">
        <BodyText weight="semibold">CONTACT US NOW!</BodyText>

        {/* ✅ Clickable Email */}
        <div>
          <BodyText weight="thin" size="small">
            Email Address:
          </BodyText>
          <div className="md:pl-6">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
                "I would like to Inquire",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light hover:text-blue-600 transition break-all"
            >
              {email}
            </a>
          </div>
        </div>

        {/* ✅ Clickable Phone Numbers */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/icons/call-2.svg"
              width={32}
              height={32}
              alt="Call Icon"
            />
            <BodyText weight="semibold">
              Want to Talk? <br></br>Please Call Us
            </BodyText>
          </div>

          <div className="flex flex-col gap-2 text-sm font-light">
            <button
              onClick={() => shareNumber("GOMO", "+63 976 630 8124")}
              className="text-left hover:text-blue-600 flex gap-2"
            >
              <span className="w-16">GOMO:</span>
              <span>+63 976 630 8124</span>
            </button>

            <button
              onClick={() => shareNumber("DITO", "+63 993 370 3770")}
              className="text-left hover:text-blue-600 flex gap-2"
            >
              <span className="w-16">DITO:</span>
              <span>+63 993 370 3770</span>
            </button>

            {/* <button
              onClick={() => shareNumber("SMART", "")}
              className="text-left hover:text-blue-600 flex gap-2"
            >
              <span className="w-16">SMART:</span>
              <span>+</span>
            </button> */}

            {/* <span>SMART: N/A</span> */}

            <button
              onClick={() => shareNumber("GLOBE", "+63 956 810 1871")}
              className="text-left hover:text-blue-600 flex gap-2"
            >
              <span className="w-16">GLOBE:</span>
              <span>+63 956 810 1871 / +63 966 940 6263</span>
            </button>
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
        <div className="flex justify-center gap-4 items-center">
          <SocialButtons />
        </div>
      </div>
    );
  };

  const Credits: FC = () => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <BodyText
          size="small"
          className="text-center"
          textColor="text-neutral-600"
        >
          © 2026 Joyful Pet Transport | All rights reserved. |
        </BodyText>
        <AuthButton />
      </div>
    );
  };

  if (responsive.isTabletOrMobile) {
    return (
      <div className="flex flex-col justify-center mb-2 gap-1 mt-4">
        <div className="bg-[#EAEAEA] rounded-4xl p-6 flex flex-col gap-6 relative mx-4">
          <Brand hideButton />
          <Navigation />
          <Services />
          <ContactUs />
          <SocialIcons />
        </div>
        <Credits />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mb-2 gap-4 mt-8">
      <div className="bg-[#EAEAEA] rounded-3xl sm:rounded-4xl mx-4 sm:mx-8 px-6 py-10 sm:p-16 flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3">
            <Brand />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-10 flex-1">
            <Navigation />
            <Services />
            <ContactUs />
          </div>
        </div>

        <SocialIcons />
      </div>

      <Credits />
    </div>
  );
};

export default Footer;
