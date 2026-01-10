import { FC, PropsWithChildren } from "react";
import Footer from "../contents/Footer";
import Header from "../contents/Header";

type PageWrapperContainerProps = PropsWithChildren<{
  footer?: boolean;
  header?: boolean;
}>;

const PageWrapperContainer: FC<PageWrapperContainerProps> = ({
  children,
  footer = true,
  header = true,
}) => {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #789ECD, #F2C995, #FF985B)",
      }}
    >
      {header && <Header />}
      <div className="min-h-[150vh] py-4">{children}</div>
      {footer && <Footer />}
    </div>
  );
};

export default PageWrapperContainer;
