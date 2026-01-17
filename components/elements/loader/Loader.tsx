import { FC } from "react";
import PageLoader from "./PageLoader";
import { Spinner } from "@/components/ui/spinner";

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
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <Spinner className={`size-12 ${loaderColor ?? "text-neutral-950"}`} />
      </div>
    );
  }
};

export default Loader;
