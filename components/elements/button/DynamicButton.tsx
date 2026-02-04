import { FC, PropsWithChildren } from "react";

type DynamicButtonProps = PropsWithChildren<{
  type?: "default" | "outline" | "orange";
  size?: "default" | "medium";
  onPress?: () => void;
  className?: string;
  rounded?: boolean;
}>;

const DynamicButton: FC<DynamicButtonProps> = ({
  children,
  type = "default",
  size = "default",
  onPress,
  className,
  rounded,
}) => {
  const ButtonType = {
    default:
      "bg-[#17528A] hover:bg-transparent border-2 border-[#17528A] text-neutral-100 hover:text-neutral-800",
    outline:
      "border-2 border-[#17528A] hover:bg-[#17528A] text-neutral-800 hover:text-neutral-300",
    orange: "border-2 bg-[#F37E48] border-[#F37E48] text-white",
  };

  const ButtonSize = {
    default: "py-2 text-base",
    medium: "py-2 text-sm",
  };

  return (
    <div
      className={`${className} min-w-44 justify-center items-center ${rounded ? "rounded-full" : "rounded-lg"} ${
        ButtonType[type || "default"]
      } ${ButtonSize[size || "default"]} text-center uppercase font-semibold`}
      onClick={onPress}
    >
      {children}
    </div>
  );
};

export default DynamicButton;
