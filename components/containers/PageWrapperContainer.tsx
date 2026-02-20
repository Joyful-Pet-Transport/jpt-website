import { FC, PropsWithChildren } from "react";
import Footer from "../contents/Footer";
import Header from "../contents/Header";

type PageWrapperContainerProps = PropsWithChildren<{
  footer?: boolean;
  header?: boolean;
  className?: string;
  removeBg?: boolean;
  square?: boolean;
  noHeaderImage?: boolean;
}>;

const PageWrapperContainer: FC<PageWrapperContainerProps> = ({
  children,
  footer = true,
  header = true,
  className,
  removeBg,
  square = false,
  noHeaderImage = false,
}) => {
  return (
    <div
      className="flex flex-col overflow-hidden w-full"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #41B2F6, #FBF2B3, #FF985B)",
      }}
    >
      {header && <Header square={square} noHeaderImage={noHeaderImage} />}
      <div
        className={`min-h-screen py-8 flex flex-col gap-12 ${!removeBg && `bg-white ${!square ? "rounded-b-4xl" : ""} mx-8`} ${className}`}
      >
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default PageWrapperContainer;
