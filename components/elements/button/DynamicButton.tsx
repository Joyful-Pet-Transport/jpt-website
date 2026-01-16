import { FC, PropsWithChildren } from "react";
import BodyText from "../text/BodyText";

type DynamicButtonProps = PropsWithChildren<{
  type?: "default" | "outline";
  onPress?: () => void;
  className?: string;
}>;

const DynamicButton: FC<DynamicButtonProps> = ({
  children,
  type = "default",
  onPress,
  className,
}) => {
  const ButtonType = {
    default: "bg-[#17528A] hover:bg-transparent border-2 border-[#17528A]",
    outline: "border-2 border-[#17528A] hover:bg-[#17528A]",
  };

  return (
    <div
      className={`${className} min-w-44 justify-center items-center111111 py-4 rounded-lg ${
        ButtonType[type || "default"]
      } ${
        type === "default"
          ? "text-neutral-300 hover:text-neutral-800"
          : "text-neutral-800 hover:text-neutral-300"
      } text-center uppercase text-lg font-semibold`}
      onClick={onPress}
    >
      {children}
    </div>
  );
};

export default DynamicButton;
