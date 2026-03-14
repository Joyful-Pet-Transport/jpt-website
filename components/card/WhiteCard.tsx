import { FC, PropsWithChildren } from "react";

const WhiteCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-lg bg-white border border-slate-300 p-4 w-full">
      {children}
    </div>
  );
};

export default WhiteCard;
