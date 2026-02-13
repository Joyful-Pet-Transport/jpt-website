"use client";

import { FC, PropsWithChildren } from "react";

type BodyTextProps = PropsWithChildren<{
  className?: string;
  weight?: "thin" | "normal" | "semibold" | "bold";
  size?: "xsmall" | "small" | "normal" | "medium" | "large" | "xlarge";
  font?: "poppins" | "fredoka" | "luckiestGuy" | "leagueSpartan";
  textColor?: string;
  white?: boolean;
  onPress?: () => void;
}>;

const BodyText: FC<BodyTextProps> = ({
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
    thin: "font-[300]",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const sizeClasses = {
    xsmall: "text-xs",
    small: "text-sm",
    normal: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
    xlarge: "text-3xl",
  };

  const fontClasses = {
    poppins: "font-poppins",
    fredoka: "font-fredoka",
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
        sizeClasses[size || "normal"]
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

export default BodyText;
