"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import { NavItem, navItems } from "@/utils/config/navItems";
import DynamicButton from "../elements/button/DynamicButton";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { IoMenuOutline } from "react-icons/io5";
import useModal from "@/utils/hooks/useModal";

type HeaderItemProps = {
  item: NavItem;
};

const ModalHeaderItem: FC<HeaderItemProps> = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setShown } = useModal();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-3 px-6 hover:bg-neutral-100">
      <div className="flex flex-row gap-2">
        <BodyText
          key={item.path}
          onPress={() => {
            router.push(item.path);
            setShown(false);
          }}
          className={`${
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path))
              ? "text-blue-500!"
              : ""
          } flex items-center text-center gap-2`}
        >
          {item.label}
        </BodyText>
        {item.children && (
          <button onClick={toggleDropdown} className="cursor-pointer">
            {isOpen ? <HiChevronDown /> : <HiChevronRight />}
          </button>
        )}
      </div>
      {isOpen && item.children && (
        <div className="flex flex-col gap-2 py-2">
          {item.children.map((child, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(`${item.path}${child.path}`);
                setIsOpen(false);
                setShown(false);
              }}
            >
              <BodyText
                className={
                  pathname === `${item.path}${child.path}`
                    ? "text-blue-500! text-center"
                    : "text-center"
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
          size="base"
          className={`${
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path))
              ? "text-blue-500!"
              : ""
          } flex items-center`}
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

const Header: FC<{ disableLayout?: boolean }> = ({ disableLayout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";
  const responsive = useResponsive();
  const modal = useModal();

  const HeaderBar: FC = () => {
    if (responsive.isTabletOrMobile) {
      return (
        <div className="h-22 relative mx-4 rounded-3xl mt-4 bg-[#EAEAEA] flex items-center z-150">
          <div className="w-full h-full px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex flex-1 gap-4 justify-between">
              <div
                className="flex flex-row gap-2 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/images/logo/logo-new.png"
                  width={150}
                  height={150}
                  alt="Logo"
                  priority
                  className="w-auto h-16"
                />
                <div className="flex items-center">
                  <BodyText weight="bold" font="luckiestGuy" textColor="000F3F">
                    JOYFUL PET TRANSPORT
                  </BodyText>
                </div>
              </div>
              <div
                className="flex items-center z-20"
                onClick={() => {
                  modal.setModalComponent(
                    <div className="flex flex-col gap-2">
                      {navItems.map((item, index) => (
                        <ModalHeaderItem key={index} item={item} />
                      ))}
                      <DynamicButton size="medium" rounded>
                        book now
                      </DynamicButton>
                    </div>,
                    "normal",
                  );
                  modal.setShown(true);
                }}
              >
                <IoMenuOutline className="text-3xl" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`h-22 relative mx-8 rounded-4xl mt-8 bg-[#EAEAEA] flex items-center ${isNotHomePage && "z-1"}`}
      >
        <div className="w-full h-full px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-1">
            <div
              className="flex flex-row gap-2 cursor-pointer items-center"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo/logo-new.png"
                width={150}
                height={150}
                alt="Logo"
                priority
                className="w-auto h-16"
              />
              <div className="text-center">
                <BodyText
                  size="large"
                  weight="bold"
                  font="luckiestGuy"
                  textColor="000F3F"
                >
                  JOYFUL PET TRANSPORT
                </BodyText>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 items-center z-50">
            {navItems.map((item, index) => (
              <HeaderItem key={index} item={item} />
            ))}
          </div>

          {/* Book now Button */}
          <div className="flex flex-1 justify-end items-center h-full z-150">
            <DynamicButton
              size="medium"
              rounded
              onPress={() => router.push("/our-services")}
            >
              book now
            </DynamicButton>
          </div>
        </div>
      </div>
    );
  };

  if (isNotHomePage && !disableLayout) {
    return (
      <div
        className={`relative flex flex-col h-140 bg-[#EAEAEA] rounded-t-4xl ${responsive.isTabletOrMobile ? "mx-4 mt-4" : "mx-8 mt-8"}`}
      >
        <HeaderBar />
        <div className="absolute inset-0 w-full h-full rounded-t-4xl overflow-hidden">
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
