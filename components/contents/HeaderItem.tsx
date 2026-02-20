"use client";

import { FC, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";

import type { NavItem } from "@/utils/config/navItems";
import BodyText from "../elements/text/BodyText";

type HeaderItemProps = {
  item: NavItem;
};

const HeaderItem: FC<HeaderItemProps> = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const isActive =
    pathname === item.path ||
    (item.path !== "/" && pathname.startsWith(item.path));

  const handleNavigate = () => {
    router.push(item.path);
  };

  return (
    <div className="relative flex flex-col items-start gap-2" ref={dropdownRef}>
      <div className="flex flex-row items-center gap-2">
        <BodyText
          onPress={handleNavigate}
          className={`flex items-center gap-2 !text-sm lg:!text-sm xl:!text-base ${
            isActive ? "text-blue-500!" : ""
          }`}
        >
          {item.label}
          {item.children && (
            <HiChevronDown
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
            />
          )}
        </BodyText>
      </div>

      {isOpen && item.children && (
        <div className="relative left-0 mt-2 flex w-full flex-col gap-2 overflow-hidden rounded-xl border border-gray-300 bg-[#EAEAEA] p-2 shadow-lg lg:absolute lg:top-full lg:mt-1 lg:min-w-80 lg:w-auto lg:shadow-2xl">
          {item.children.map((child, index) => {
            const childPath = `${item.path}${child.path}`;
            const childActive = pathname === childPath;

            return (
              <button
                key={index}
                type="button"
                className="w-full rounded-xl px-4 py-1 text-left hover:bg-white"
                onClick={() => {
                  router.push(childPath);
                  setIsOpen(false);
                }}
              >
                <BodyText className={childActive ? "text-blue-500!" : ""}>
                  {child.label}
                </BodyText>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderItem;

