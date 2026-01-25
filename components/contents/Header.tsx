"use client";

import { FC, useEffect } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import SocialButton from "../elements/button/SocialButton";

const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/AboutUs" },
    { label: "Our Services", path: "/OurServices" },
    { label: "Testimonials", path: "/Testimonials" },
    { label: "FAQs", path: "/Faq" },
    { label: "Contact Us", path: "/ContactUs" },
  ];

  useEffect(() => {}, []);

  return (
    <div className="h-28 relative mx-8 rounded-4xl mt-8 bg-[#EAEAEA] flex items-center">
      <div className="w-full h-full px-10 flex justify-between items-center">
        {/* Logo */}
        <div
          className="rounded-full overflow-hidden cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/logo/logo.png"
            width={75}
            height={75}
            alt="Logo"
            priority
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-8 items-center">
          {navItems.map((item) => (
            <BodyText
              key={item.path}
              onPress={() => router.push(item.path)}
              className={pathname === item.path ? "text-blue-500!" : ""}
            >
              {item.label}
            </BodyText>
          ))}
        </div>

        {/* Social Buttons */}
        <div className="flex flex-row gap-4 items-center h-full">
          <SocialButton
            icon="/images/icons/colored/messenger.svg"
            onPress={() => {}}
          />
          <SocialButton
            icon="/images/icons/colored/facebook.svg"
            onPress={() => {}}
          />
          <SocialButton
            icon="/images/icons/colored/instagram.svg"
            onPress={() => {}}
          />
          <SocialButton
            icon="/images/icons/colored/tiktok.svg"
            onPress={() => {}}
          />
        </div>
      </div>
    </div>
  );

  // old
  return (
    <div className="h-36 relative">
      <div
        className="absolute inset-0 bg-[#D9D9D9] opacity-7"
        style={{ boxShadow: "3px 6px 13.2px 0px #00000040" }}
      />
      <BoxedContainer className="h-full w-full justify-center flex items-center relative z-10">
        <div className="w-full flex justify-between items-center">
          <div onClick={() => router.push("/")}>
            <Image
              src="/images/logo/logo.png"
              width={75}
              height={75}
              alt="Logo"
              priority
            />
          </div>
          <div className="flex gap-8 items-center">
            <BodyText onPress={() => router.push("/")} weight="semibold">
              Home
            </BodyText>
            <BodyText
              onPress={() => router.push("/OurServices")}
              weight="semibold"
            >
              Our Services
            </BodyText>
            <BodyText onPress={() => router.push("/AboutUs")} weight="semibold">
              About Us
            </BodyText>
            <BodyText onPress={() => router.push("/Faq")} weight="semibold">
              FAQs
            </BodyText>
            <BodyText
              onPress={() => router.push("/ContactUs")}
              weight="semibold"
            >
              Contact Us
            </BodyText>
          </div>
        </div>
      </BoxedContainer>
    </div>
  );
};

export default Header;
