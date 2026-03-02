"use client";

import { FC, PropsWithChildren } from "react";

type BodyTextProps = PropsWithChildren<{
  className?: string;
  weight?: "thin" | "normal" | "semibold" | "bold";
  size?: "xsmall" | "small" | "base" | "normal" | "medium" | "large" | "xlarge";
  font?: "poppins" | "fredoka" | "luckiestGuy" | "leagueSpartan";
  textColor?: string;
  white?: boolean;
  onPress?: () => void;
  /** When true, no size class is applied so responsive sizes in className take effect */
  suppressSize?: boolean;
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
  suppressSize = false,
}) => {
  const weightClasses = {
    thin: "font-[300]",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const sizeClasses = {
    xsmall: "text-xs lg:text-xs",
    small: "text-xs lg:text-sm",
    base: "text-sm lg:text-base",
    normal: "text-base lg:text-lg",
    medium: "text-lg lg:text-xl",
    large: "text-xl lg:text-2xl",
    xlarge: "text-2xl lg:text-3xl",
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
    <p
      className={`${className} ${weightClasses[weight || "normal"]} ${
        !suppressSize ? sizeClasses[size || "normal"] : ""
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
    </p>
  );
};

export default BodyText;
