"use client";

import { FC, PropsWithChildren, useState, useEffect } from "react";
import Footer from "../contents/Footer";
import Header from "../contents/Header";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

type PageWrapperContainerProps = PropsWithChildren<{
  footer?: boolean;
  header?: boolean;
  className?: string;
  removeBg?: boolean;
  disableLayout?: boolean;
}>;

const PageWrapperContainer: FC<PageWrapperContainerProps> = ({
  children,
  footer = true,
  header = true,
  className,
  removeBg,
  disableLayout,
}) => {
  const responsive = useResponsive();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const styleClass: string = `
    ${responsive.isTabletOrMobile ? "py-4" : "py-8"}
    ${!removeBg ? (responsive.isTabletOrMobile ? "mx-4" : "mx-8") : ""}
    ${!removeBg ? "bg-white pb-16 rounded-b-4xl" : ""}
  `;

  return (
    <div
      className="flex flex-col w-full"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #41B2F6, #FBF2B3, #FF985B)",
      }}
    >
      {header && <Header disableLayout={disableLayout} />}
      <div className="flex flex-col overflow-hidden w-full">
        <div
          className={`min-h-screen flex flex-col ${responsive.isTabletOrMobile ? "gap-4" : "gap-12"} ${styleClass} ${className}`}
        >
          {children}
        </div>
        {footer && <Footer />}
      </div>
    </div>
  );
};

export default PageWrapperContainer;
