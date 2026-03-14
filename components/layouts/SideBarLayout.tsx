import { FC } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import { PiSignOutBold } from "react-icons/pi";
import BodyText from "../elements/text/BodyText";
import { useRouter, usePathname } from "next/navigation";
import { PiIslandFill } from "react-icons/pi";
import { useAuthActions } from "@convex-dev/auth/react";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

interface SideBarLayoutProps {
  isOpen: boolean;
  isDrawer?: boolean;
  onClose?: () => void;
}

const sidebarItems = [
  { label: "Dashboard", route: "/dashboard", icon: HiOutlineSquares2X2 },
  {
    label: "Bookings",
    route: "/dashboard/bookings",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Reports",
    route: "/dashboard/reports",
    icon: HiOutlinePresentationChartLine,
  },
  { label: "Countries", route: "/dashboard/countries", icon: PiIslandFill },
  { label: "Users", route: "/dashboard/users", icon: HiOutlineUsers },
  { label: "Logout", route: "/dashboard/users", icon: PiSignOutBold },
];

const SideBarLayout: FC<SideBarLayoutProps> = ({
  isOpen,
  isDrawer = false,
  onClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthActions();
  const responsive = useResponsive();

  const handleNavigate = (route: string) => {
    router.push(route);
    if (isDrawer && onClose) onClose();
  };

  const filteredItems = sidebarItems.filter(({ label }) => {
    if (label === "Logout") {
      return responsive.isTabletOrMobile;
    }
    return true;
  });

  const handleClick = (label: string, route: string) => {
    if (label === "Logout") {
      signOut();
      if (isDrawer && onClose) onClose();
    } else {
      handleNavigate(route);
    }
  };

  const renderButtons = () =>
    filteredItems.map(({ label, route, icon: Icon }) => {
      const isActive = pathname === route;
      return (
        <button
          key={label}
          onClick={() => handleClick(label, route)}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-200 transition-colors w-full text-left
            ${isActive && "text-blue-400 bg-slate-200"}
          `}
        >
          <span className="shrink-0">
            <Icon size={22} />
          </span>
          <BodyText
            size="base"
            className={`
              ${isActive && "text-blue-400!"}
              whitespace-nowrap transition-opacity duration-150
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
          >
            {label}
          </BodyText>
        </button>
      );
    });

  if (isDrawer) {
    return (
      <aside
        className={`
          absolute top-0 left-0 h-full z-30
          w-72 bg-white flex flex-col shrink-0 overflow-hidden
          py-4 px-3 gap-1 shadow-xl
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {renderButtons()}
      </aside>
    );
  }

  return (
    <aside
      className={`
        ${isOpen ? "w-72" : "w-18"}
        transition-[width] duration-200 ease-in-out bg-white
        flex flex-col items-center shrink-0 overflow-hidden
        py-4 px-3 gap-1
      `}
    >
      {renderButtons()}
    </aside>
  );
};

export default SideBarLayout;
