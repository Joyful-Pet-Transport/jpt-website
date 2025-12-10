"use client";

import { FC, PropsWithChildren, ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoaderContext from "../contexts/loader-context";

interface LoaderProviderProps extends PropsWithChildren {
  backgroundComponent?: ReactNode;
}

const LoaderProvider: FC<LoaderProviderProps> = ({
  children,
}: LoaderProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundComponent, setBackgroundComponent] =
    useState<ReactNode>(null);
  const pathname = usePathname();

  const toggleLoader = () => {
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    setBackgroundComponent(null);
  }, [pathname]);

  return (
    <LoaderContext.Provider
      value={{
        loading: loading,
        toggleLoader: toggleLoader,
        setLoading: setLoading,
        backgroundComponent: backgroundComponent,
        setBackgroundComponent: setBackgroundComponent,
      }}
    >
      {children}
      {backgroundComponent}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
