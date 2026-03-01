import { FC, PropsWithChildren } from "react";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const GrayCardContainer: FC<PropsWithChildren> = ({ children }) => {
  const mobile = useIsMobile();

  return (
    <div
      className={`rounded-xl bg-white justify-center items-center ${mobile ? "min-w-full" : "min-w-[500px]"} p-8`}
    >
      {children}
    </div>
  );
};

export default GrayCardContainer;
