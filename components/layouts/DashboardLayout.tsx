import { FC, PropsWithChildren, useState, useEffect } from "react";
import SideBarLayout from "./SideBarLayout";
import NavBarLayout from "./NavBarLayout";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean | undefined>(
    undefined,
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const { isTabletOrMobile } = useResponsive();

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

  // Close sidebar when switching to mobile/tablet
  useEffect(() => {
    if (isTabletOrMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isTabletOrMobile]);

  if (!isHydrated) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
        <div className="animate-pulse bg-gray-200 h-16" />
        <div className="flex flex-1 overflow-hidden">
          <div className="animate-pulse bg-gray-200 w-72" />
          <main className="flex-1 overflow-y-auto">
            <div className="animate-pulse bg-gray-200 h-full" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      <NavBarLayout onToggleSidebar={() => setSidebarOpen((o) => !o!)} />
      <div className="relative flex flex-1 overflow-hidden">
        {/* Backdrop overlay for mobile/tablet drawer */}
        {isTabletOrMobile && sidebarOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <SideBarLayout
          isOpen={sidebarOpen!}
          isDrawer={isTabletOrMobile}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto md:py-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
