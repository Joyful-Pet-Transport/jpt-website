import { FC, PropsWithChildren } from "react";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const GrayCardContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const mobile = useIsMobile();

  return (
    <div
      className={`rounded-3xl bg-white justify-center items-center ${mobile ? "min-w-full p-6" : "min-w-[500px] p-8"} ${className}`}
    >
      {children}
    </div>
  );
};

export default GrayCardContainer;
