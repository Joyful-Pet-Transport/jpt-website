import { FC } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useLoader } from "@/utils/hooks/useLoader";

type PageLoaderProps = {
  // using text color classes from tailwindcss
  loaderColor: string | "text-black" | "text-white" | undefined;
};

const PageLoader: FC<PageLoaderProps> = (props) => {
  const loader = useLoader();

  if (!loader.loading) return;

  if (loader.backgroundComponent) {
    return (
      <div className="fixed flex w-screen h-screen z-50 start-0 top-0">
        <div className="absolute w-full h-full align-middle justify-center items-center">
          <Spinner className={`size-8 ${props.loaderColor ?? "text-black"}`} />
        </div>
        {loader.backgroundComponent}
      </div>
    );
  }

  return (
    <div className="fixed flex justify-center align-middle items-center w-screen h-screen z-50 start-0 top-0 bg-slate-900/75">
      <Spinner className={`size-8 ${props.loaderColor ?? "text-black"}`} />
    </div>
  );
};

export default PageLoader;
