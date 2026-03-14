import { FC } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import BodyText from "../elements/text/BodyText";

interface NavBarLayoutProps {
  onToggleSidebar: () => void;
}

const NavBarLayout: FC<NavBarLayoutProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-blue-400 flex items-center justify-between px-5 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition-colors"
        >
          <HiOutlineBars3 size={22} className="text-white" />
        </button>
        <BodyText size="base" className="text-white font-medium">
          Joyful Pet Transport
        </BodyText>
      </div>
    </header>
  );
};

export default NavBarLayout;
