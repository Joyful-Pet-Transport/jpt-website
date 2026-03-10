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
    <div
      className="relative flex flex-col items-center gap-2"
      ref={dropdownRef}
    >
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
        <div className="relative left-0 mt-2 w-full flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-300 bg-[#EAEAEA] p-2 shadow-lg lg:absolute lg:top-full lg:mt-1 lg:min-w-80 lg:w-auto lg:shadow-2xl">
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
                size="base"
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
          <div className="w-full h-full px-4 flex justify-between items-center">
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
        <div className="w-full h-full px-8 gap-4 flex justify-between items-center">
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
                className="h-14 w-auto shrink-0 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16"
              />
              <BodyText
                size="medium"
                weight="bold"
                font="luckiestGuy"
                textColor="text-[#000F3F]"
              >
                JOYFUL PET TRANSPORT
              </BodyText>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 items-center justify-center z-50">
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

        {/* Centered Modal */}
        <div
          className={`fixed inset-0 z-120 flex items-center justify-center px-4 transition-all duration-300 lg:hidden ${
            modal.shown
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => modal.setShown(false)}
          />

          <nav
            className={`relative w-[92%] max-w-md rounded-3xl bg-[#EAEAEA] shadow-2xl transition-all duration-300 ${
              modal.shown ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
          >
            <div className="flex flex-col items-center px-6 py-8 text-center">
              {navItems.map((item, index) => (
                <div key={index} className="w-full py-4">
                  <HeaderItem item={item} />
                </div>
              ))}

              <div className="mt-6 w-full">
                <DynamicButton size="medium" rounded>
                  book now
                </DynamicButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  };

  if (isNotHomePage && !disableLayout) {
    return (
      <div
        className={`relative flex flex-col bg-[#EAEAEA] rounded-t-4xl ${responsive.isTabletOrMobile ? "mx-4 mt-4 h-64" : "mx-8 mt-8 h-140"}`}
      >
        <HeaderBar />
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl md:rounded-t-4xl pointer-events-none">
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
