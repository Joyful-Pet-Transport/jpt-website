import { FC, PropsWithChildren } from "react";

const GrayCardContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-xl bg-white justify-center items-center min-w-[500px] p-8">
      {children}
    </div>
  );
};

export default GrayCardContainer;
