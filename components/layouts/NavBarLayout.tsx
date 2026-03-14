"use client";

import { FC } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import BodyText from "../elements/text/BodyText";
import { useAuthActions } from "@convex-dev/auth/react";
import { PiSignOutBold } from "react-icons/pi";
import Image from "next/image";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

interface NavBarLayoutProps {
  onToggleSidebar: () => void;
}

const NavBarLayout: FC<NavBarLayoutProps> = ({ onToggleSidebar }) => {
  const { signOut } = useAuthActions();
  const responsive = useResponsive();

  return (
    <header className="h-18 bg-blue-400 flex items-center justify-between px-5 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition-colors"
        >
          <HiOutlineBars3 size={22} className="text-white" />
        </button>
        <Image
          src="/images/logo/logo-new.png"
          width={150}
          height={150}
          alt="Logo"
          priority
          className="w-auto h-16"
        />
        <BodyText
          font="luckiestGuy"
          size="medium"
          className="text-white font-medium"
        >
          Joyful Pet Transport
        </BodyText>
      </div>
      {!responsive.isTabletOrMobile && (
        <PiSignOutBold
          size={22}
          className="text-white"
          onClick={() => void signOut()}
        />
      )}
    </header>
  );
};

export default NavBarLayout;
