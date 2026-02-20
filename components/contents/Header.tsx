"use client";

import { FC, useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-start gap-2" ref={dropdownRef}>
      <div className="flex flex-row gap-2 items-center">
        <BodyText
          key={item.path}
          onPress={() => router.push(item.path)}
          className={`${
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path))
              ? "text-blue-500!"
              : ""
          } flex items-center gap-2`}
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
              <BodyText
                className={
                  pathname === `${item.path}${child.path}`
                    ? "text-blue-500!"
                    : ""
                }
              >
                {child.label}
              </BodyText>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type HeaderProps = {
  square?: boolean;
  noHeaderImage?: boolean;
};

const Header: FC<HeaderProps> = ({ square = false, noHeaderImage = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  const HeaderBar: FC = () => {
    return (
      <div
        className={` relative ${!square ? "rounded-4xl mt-8 mx-8 bg-[#EAEAEA] h-22" : "bg-[#D9D9D9]/5 shadow-lg/3 h-26"}   flex items-center z-1`}
      >
        <div className="w-full h-full px-10 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-1">
            <div
              className="flex flex-row gap-2 cursor-pointer items-center"
              onClick={() => router.push("/")}
            >
              <Image
                src={
                  square
                    ? "/images/logo/joyfullogo.png"
                    : "/images/logo/logo-new.png"
                }
                width={150}
                height={150}
                alt="Logo"
                priority
                className="w-auto h-16 pl-20"
              />
              {!square && (
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
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-8 items-center">
            {navItems.map((item, index) => (
              <HeaderItem key={index} item={item} />
            ))}
          </div>

          {/* Book now Button */}
          {!square && (
            <div className="flex flex-1 justify-end items-center h-full">
              <DynamicButton size="medium" rounded>
                book now
              </DynamicButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isNotHomePage && !noHeaderImage) {
    return (
      <div
        className={`relative flex flex-col h-140 bg-[#EAEAEA] mx-8 mt-8 ${!square ? "rounded-t-4xl" : ""}`}
      >
        <HeaderBar />
        <div
          className={`absolute inset-0 w-full h-full ${!square ? "rounded-t-4xl" : ""} overflow-hidden`}
        >
          <Image
            src="/images/element/header-bg-image.png"
            alt="background"
            fill
            className="object-cover brightness-[.5]"
            priority
          />
        </div>
      </div>
    );
  }

  return <HeaderBar />;
};

export default Header;
