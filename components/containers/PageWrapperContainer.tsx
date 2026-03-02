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

  return (
    <div
      className="flex flex-col overflow-hidden w-full"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #41B2F6, #FBF2B3, #FF985B)",
      }}
    >
      {header && <Header disableLayout={disableLayout} />}
      <div
        className={`min-h-screen flex flex-col gap-12 ${!removeBg && "bg-white rounded-b-4xl"} ${responsive.isTabletOrMobile ? "mx-4 py-4" : "mx-8 py-8"} ${className}`}
      >
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default PageWrapperContainer;
