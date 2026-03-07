import { FC, PropsWithChildren } from "react";

type DynamicButtonProps = PropsWithChildren<{
  type?: "default" | "outline" | "orange";
  size?: "default" | "medium";
  onPress?: () => void;
  className?: string;
  rounded?: boolean;
  disabled?: boolean;
  htmlType?: "submit" | "button";
}>;

const DynamicButton: FC<DynamicButtonProps> = ({
  children,
  type = "default",
  size = "default",
  onPress,
  className,
  rounded,
  disabled = false,
  htmlType = "button",
}) => {
  const ButtonType = {
    default:
      "bg-[#17528A] hover:bg-transparent border-2 border-[#17528A] text-neutral-100 hover:text-neutral-800",
    outline:
      "border-2 border-[#17528A] hover:bg-[#17528A] text-neutral-800 hover:text-neutral-300",
    orange:
      "border-2 bg-[#F37E48] border-[#F37E48] text-white hover:bg-transparent hover:text-[#F37E48]",
  };

  const ButtonSize = {
    default: "px-8 py-4 text-base",
    medium: "py-2 text-sm",
  };

  return (
    <button
      type={htmlType}
      className={`max-w-96 min-w-36 justify-center items-center ${rounded ? "rounded-full" : "rounded-xl"} ${
        ButtonType[type || "default"]
      } ${ButtonSize[size || "default"]} text-center uppercase font-semibold ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onPress}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DynamicButton;
