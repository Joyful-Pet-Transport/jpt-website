import { FC, PropsWithChildren } from "react";

type InfoCardsProps = PropsWithChildren<{
  className?: string;
  medium?: boolean;
}>;

const InfoCards: FC<InfoCardsProps> = ({
  children,
  className,
  medium = false,
}) => {
  return (
    <div
      className={`${className} w-[500px] h-[420px] p-8 bg-[#EAEAEA] rounded-3xl flex flex-col gap-2`}
    >
      {children}
    </div>
  );
};

export default InfoCards;
