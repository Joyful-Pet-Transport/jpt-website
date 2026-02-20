"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { usePathname, useRouter } from "next/navigation";
import { NavItem, navItems } from "@/utils/config/navItems";
import DynamicButton from "../elements/button/DynamicButton";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";

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
    <div className="relative flex flex-col items-center gap-2" ref={dropdownRef}>
      <div className="flex flex-row gap-2 items-center">
        <BodyText
          key={item.path}
          onPress={() => router.push(item.path)}
          className={`${
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path))
              ? "text-blue-500!"
              : ""
          } flex items-center gap-2 !text-sm lg:!text-sm xl:!text-base`}
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

const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const HeaderBar: FC = () => {
    return (
      <div className="relative z-[100] w-full max-w-[100vw] overflow-visible">
        <div className="relative z-[100] mx-2 mt-4 min-h-14 rounded-2xl bg-[#EAEAEA] flex items-center overflow-hidden sm:mx-4 sm:mt-6 sm:min-h-16 sm:rounded-3xl md:mx-6 md:mt-8 md:h-20 md:rounded-4xl lg:mx-8 lg:mt-8 lg:h-[5.5rem] lg:rounded-4xl">
          <div className="flex w-full flex-1 items-center gap-2 px-2 py-3 sm:gap-3 sm:px-3 sm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4">
            {/* Logo - text hidden on smaller screens */}
            <div className="flex min-w-0 flex-shrink">
              <div
              className="flex cursor-pointer flex-row items-center gap-2 sm:gap-3 md:gap-4"
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
              <div className="flex min-w-0 flex-col items-start justify-center text-left">
                <BodyText
                  size="xlarge"
                  weight="bold"
                  font="luckiestGuy"
                  textColor="000F3F"
                  className="!text-base sm:!text-base md:text-lg lg:!text-xl xl:!text-2xl 2xl:!text-3xl !m-0 !leading-tight"
                >
                  JOYFUL PET TRANSPORT
                </BodyText>
              </div>
            </div>
            </div>

            {/* Desktop Navigation - centered */}
            <div className="hidden flex-1 justify-center lg:flex lg:items-center lg:gap-3 xl:gap-4 2xl:gap-6">
              {navItems.map((item, index) => (
                <HeaderItem key={index} item={item} />
              ))}
            </div>

            {/* Right side: Book now Button (desktop) and Hamburger button (mobile/tablet) */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Book now Button - desktop only (tablet/mobile: inside hamburger menu) */}
              <div className="hidden lg:flex lg:items-center">
                <DynamicButton size="medium" rounded>
                  book now
                </DynamicButton>
              </div>

              {/* Hamburger button - tablet & mobile only */}
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative z-[110] flex shrink-0 items-center justify-center rounded-lg p-1.5 text-[#000F3F] transition-colors hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#17528A] lg:hidden sm:p-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
              >
                {menuOpen ? (
                  <HiX className="h-7 w-7 sm:h-8 sm:w-8" />
                ) : (
                  <HiMenu className="h-7 w-7 sm:h-8 sm:w-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Centered Modal */}
        <div
          className={`fixed inset-0 z-[120] flex items-center justify-center px-4 transition-all duration-300 lg:hidden ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          
          <nav
            className={`relative w-[92%] max-w-md rounded-3xl bg-[#EAEAEA] shadow-2xl transition-all duration-300 ${
              menuOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
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

  if (isNotHomePage) {
    return (
      <div className="relative flex flex-col bg-[#EAEAEA] mx-2 mt-4 h-48 sm:mx-4 sm:mt-6 sm:h-64 md:mx-6 md:mt-8 md:h-80 lg:mx-8 lg:mt-8 lg:h-[22rem] xl:h-[35rem] rounded-t-2xl sm:rounded-t-3xl md:rounded-t-4xl">
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
