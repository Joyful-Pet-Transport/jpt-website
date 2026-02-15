import { FC, PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren<{
  className?: string;
  weight?: "normal" | "semibold" | "thin";
  size?: "medium" | "normal" | "large" | "xlarge";
  font?: "poppins" | "fredoka" | "luckiestGuy" | "leagueSpartan";
  textColor?: string;
  white?: boolean;
  onPress?: () => void;
}>;

const Heading: FC<HeadingProps> = ({
  children,
  className,
  weight,
  size,
  font,
  textColor,
  white = false,
  onPress,
}) => {
  const weightClasses = {
    normal: "font-bold",
    semibold: "font-semibold",
    thin: "font-normal",
  };

  const sizeClasses = {
    normal: "text-2xl",
    medium: "text-3xl",
    large: "text-5xl",
    xlarge: "text-6xl",
  };

  const fontClasses = {
    poppins: "font-poppins",
    fredoka: "font-[fredoka]",
    luckiestGuy: "font-[luckiest_guy]",
    leagueSpartan: "font-[league_spartan]",
  };

  const colorClasses = textColor
    ? textColor
    : white
      ? "text-neutral-50"
      : "text-neutral-950";

  return (
    <h1
      className={`${className} ${weightClasses[weight || "normal"]} ${
        sizeClasses[size || "large"]
      } ${fontClasses[font || "poppins"]} ${colorClasses} ${
        onPress
          ? textColor
            ? "cursor-pointer"
            : white
              ? "cursor-pointer hover:text-neutral-300"
              : "cursor-pointer hover:text-neutral-800"
          : ""
      }`}
      onClick={onPress}
    >
      {children}
    </h1>
  );
};

export default Heading;
