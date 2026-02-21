import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number;
  height: number;
}

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return windowDimensions;
}

interface MobileResponsiveness {
  isMobile: boolean;
  isTablet: boolean;
  isTabletOrMobile: boolean;
}

export function useResponsive(): MobileResponsiveness {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isTabletOrMobile = width < 1024;

  return {
    isMobile,
    isTablet,
    isTabletOrMobile,
  };
}

export function useIsMobile(): boolean {
  return useResponsive().isMobile;
}

export function useIsTablet(): boolean {
  return useResponsive().isTablet;
}
