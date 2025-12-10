import { Spinner } from "@/components/ui/spinner";
import { useLoader } from "@/utils/hooks/useLoader";
import { FC } from "react";

type SectionLoaderProps = {
  // using text color classes from tailwindcss
  loaderColor: string | "text-black" | "text-white" | undefined;
};

const SectionLoader: FC<SectionLoaderProps> = (props) => {
  const loader = useLoader();

  if (!loader.loading) return;

  return (
    <div className="fixed flex justify-center align-middle items-center w-full h-full">
      <Spinner className={`size-8 ${props.loaderColor ?? "text-black"}`} />
    </div>
  );
};

export default SectionLoader;
