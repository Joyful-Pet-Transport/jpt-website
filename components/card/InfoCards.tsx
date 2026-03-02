import { FC, PropsWithChildren } from "react";

type InfoCardsProps = PropsWithChildren<{
  className?: string;
}>;

const InfoCards: FC<InfoCardsProps> = ({ children, className }) => {
  return (
    <div
      className={`min-h-[420px] max-w-3xl mx-auto w-full p-8 bg-[#FEF5EE] rounded-3xl flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default InfoCards;
