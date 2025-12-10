import { FC } from "react";
import PageLoader from "./PageLoader";

/* READ ME
 * Type:
 * page
 * section
 */

export type LoaderProps = {
  type?: string;
  loaderColor?: string | "000000" | "FFFFFF" | undefined;
};

const Loader: FC<LoaderProps> = ({ type = "section", loaderColor }) => {
  if (type === "page") {
    return <PageLoader loaderColor={loaderColor} />;
  }

  if (type === "section") {
    return <PageLoader loaderColor={loaderColor} />;
  }
};

export default Loader;
