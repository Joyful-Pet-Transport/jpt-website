import { FC, PropsWithChildren } from "react";
import Footer from "../contents/Footer";
import Header from "../contents/Header";

type PageWrapperContainerProps = PropsWithChildren<{
  footer?: boolean;
  header?: boolean;
  className?: string;
}>;

const PageWrapperContainer: FC<PageWrapperContainerProps> = ({
  children,
  footer = true,
  header = true,
  className,
}) => {
  return (
    <div
      className="flex flex-col gap-12 overflow-hidden w-full"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #41B2F6, #FBF2B3, #FF985B)",
      }}
    >
      {header && <Header />}
      <div className={`min-h-screen py-4 flex flex-col ${className}`}>
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default PageWrapperContainer;
