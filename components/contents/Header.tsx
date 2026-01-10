import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";

const Header: FC = () => {
  return (
    <div className="h-36 relative">
      <div
        className="absolute inset-0 bg-[#D9D9D9] opacity-7"
        style={{ boxShadow: "3px 6px 13.2px 0px #00000040" }}
      />
      <BoxedContainer className="h-full w-full justify-center flex items-center relative z-10">
        <div className="w-full flex justify-between items-center">
          <Image
            src="/images/logo/logo.png"
            width={75}
            height={75}
            alt="Logo"
            priority
          />
          <div className="flex gap-8">
            <BodyText onPress={() => {}} weight="semibold">
              Our Services
            </BodyText>
            <BodyText onPress={() => {}} weight="semibold">
              About Us
            </BodyText>
            <BodyText onPress={() => {}} weight="semibold">
              FAQs
            </BodyText>
            <BodyText onPress={() => {}} weight="semibold">
              Contact Us
            </BodyText>
          </div>
        </div>
      </BoxedContainer>
    </div>
  );
};

export default Header;
