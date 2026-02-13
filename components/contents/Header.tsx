"use client";

import { FC, useState } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import { NavItem, navItems } from "@/utils/config/navItems";
import DynamicButton from "../elements/button/DynamicButton";
import { HiChevronDown } from "react-icons/hi";

type HeaderItemProps = {
  item: NavItem;
};

const HeaderItem: FC<HeaderItemProps> = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex flex-row gap-2 items-center">
        <BodyText
          key={item.path}
          onPress={() => router.push(item.path)}
          className={`${pathname === item.path ? "text-blue-500!" : ""} flex items-center gap-2`}
        >
          {item.label}
          {item.children && (
            <HiChevronDown
              className="cursor-pointer"
              onClick={toggleDropdown}
            />
          )}
        </BodyText>
      </div>

      {isOpen && item.children && (
        <div className="absolute top-full left-0 mt-1 bg-[#EAEAEA] shadow-2xl border border-gray-300 rounded-xl z-50 min-w-80 overflow-hidden flex flex-col gap-2 p-2">
          {item.children.map((child, index) => (
            <div
              key={index}
              className="px-4 py-1 hover:bg-white rounded-xl cursor-pointer"
              onClick={() => {
                router.push(`${item.path}${child.path}`);
                setIsOpen(false);
              }}
            >
              <BodyText>{child.label}</BodyText>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
            {navItems.map((item, index) => (
              <HeaderItem key={index} item={item} />
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
