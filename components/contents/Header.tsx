"use client";

import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import SocialButtons from "./SocialButtons";
import { navItems } from "@/utils/config/navItems";

const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  return (
    <>
      <div className="h-28 relative mx-8 rounded-4xl mt-8 bg-[#EAEAEA] flex items-center z-10">
        <div className="w-full h-full px-10 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-1">
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
          <div className="flex flex-1 justify-end items-center h-full">
            <SocialButtons />
          </div>
        </div>
      </div>

      {/* bbbackground image */}
      {isNotHomePage && (
        <div className="relative flex h-64 md:h-80 lg:h-96 mx-4 -mt-45 z-0">
          <div className="relative w-full h-full rounded-t-4xl overflow-hidden">
            <Image
              src="/images/element/ourserviceBackground.jpg"
              alt="our services bbackground"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
