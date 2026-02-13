"use client";

import { FC } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/utils/config/navItems";
import DynamicButton from "../elements/button/DynamicButton";

const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  const HeaderBar: FC = () => {
    return (
      <div className="h-22 relative mx-8 rounded-4xl mt-8 bg-[#EAEAEA] flex items-center z-1">
        <div className="w-full h-full px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-1">
            <div
              className="flex flex-row gap-2 cursor-pointer items-center"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo/logo-new.png"
                width={75}
                height={75}
                alt="Logo"
                priority
              />
              <div className="text-center">
                <BodyText
                  size="xlarge"
                  weight="bold"
                  font="luckiestGuy"
                  textColor="000F3F"
                >
                  JOYFUL PET TRANSPORT
                </BodyText>
                <BodyText
                  size="small"
                  weight="semibold"
                  font="leagueSpartan"
                  textColor="000F3F"
                >
                  TRANSPORTING PETS HAS NEVER BEEN THIS EASY
                </BodyText>
              </div>
            </div>
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

          {/* Book now Button */}
          <div className="flex flex-1 justify-end items-center h-full">
            <DynamicButton rounded>book now</DynamicButton>
          </div>
        </div>
      </div>
    );
  };

  if (isNotHomePage) {
    return (
      <div className="relative flex flex-col h-96 bg-[#EAEAEA] mx-8 mt-8 rounded-t-4xl">
        <HeaderBar />
        <div className="absolute inset-0 w-full h-full rounded-t-4xl overflow-hidden">
          <Image
            src="/images/element/ourserviceBackground.jpg"
            alt="background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return <HeaderBar />;
};

export default Header;
