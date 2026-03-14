import { FC, PropsWithChildren, useState, useEffect } from "react";
import SideBarLayout from "./SideBarLayout";
import NavBarLayout from "./NavBarLayout";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean | undefined>(
    undefined,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved) {
      setSidebarOpen(JSON.parse(saved));
    } else {
      setSidebarOpen(false);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && sidebarOpen !== undefined) {
      localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
        <div className="animate-pulse bg-gray-200 h-16"></div>
        <div className="flex flex-1 overflow-hidden">
          <div className="animate-pulse bg-gray-200 w-72"></div>
          <main className="flex-1 overflow-y-auto py-12">
            <div className="animate-pulse bg-gray-200 h-full"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      <NavBarLayout onToggleSidebar={() => setSidebarOpen((o) => !o!)} />
      <div className="flex flex-1 overflow-hidden">
        <SideBarLayout isOpen={sidebarOpen!} />
        <main className="flex-1 overflow-y-auto py-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
