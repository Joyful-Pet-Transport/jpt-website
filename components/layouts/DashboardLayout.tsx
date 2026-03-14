import { FC, PropsWithChildren, useState } from "react";
import SideBarLayout from "./SideBarLayout";
import NavBarLayout from "./NavBarLayout";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      <NavBarLayout onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 overflow-hidden">
        <SideBarLayout isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto py-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
