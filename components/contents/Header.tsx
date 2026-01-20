"use client";

import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const router = useRouter();

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
          <div className="flex gap-8">
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
