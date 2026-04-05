import { FC, CSSProperties } from "react";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string;
  style?: CSSProperties;
}

const Skeleton: FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  className = "",
  borderRadius = "0.375rem",
  style = {},
}) => {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export default Skeleton;
