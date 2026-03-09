import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { FC, PropsWithChildren } from "react";

type FormContainerProps = {
  className?: string;
};
const FormContainer: FC<PropsWithChildren<FormContainerProps>> = ({
  children,
  className,
}) => {
  const responsive = useResponsive();
  return (
    <div
      className={`bg-[#F0F8FF] w-full max-w-5xl mx-auto min-h-20 rounded-3xl flex flex-col gap-6 ${responsive.isMobile ? "p-4" : responsive.isTablet ? "p-8" : "p-12"} ${className}`}
    >
      {children}
    </div>
  );
};

export default FormContainer;
