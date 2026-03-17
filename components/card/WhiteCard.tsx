import { FC, PropsWithChildren } from "react";

type WhiteCardProps = {
  className?: string;
};
const WhiteCard: FC<PropsWithChildren<WhiteCardProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg bg-white border border-slate-300 p-4 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default WhiteCard;
