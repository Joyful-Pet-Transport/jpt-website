import { FC } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import BodyText from "../elements/text/BodyText";
import { useRouter, usePathname } from "next/navigation";

interface SideBarLayoutProps {
  isOpen: boolean;
}

const sidebarItems = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: HiOutlineSquares2X2,
  },
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
  {
    label: "Users",
    route: "/dashboard/users",
    icon: HiOutlineUsers,
  },
];

const SideBarLayout: FC<SideBarLayoutProps> = ({ isOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={`
        ${isOpen ? "w-72" : "w-18"}
        transition-[width] duration-200 ease-in-out bg-white
        flex flex-col items-center shrink-0 overflow-hidden
        py-4 px-3 gap-1
      `}
    >
      {sidebarItems.map(({ label, route, icon: Icon }) => {
        const isActive = pathname === route;
        return (
          <button
            key={label}
            onClick={() => router.push(route)}
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
      })}
    </aside>
  );
};

export default SideBarLayout;
