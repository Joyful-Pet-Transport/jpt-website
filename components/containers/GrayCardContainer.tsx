import { FC, PropsWithChildren } from "react";

const GrayCardContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex rounded-xl bg-[#17528AA6] w-full py-12 px-24">
      {children}
    </div>
  );
};

export default GrayCardContainer;
