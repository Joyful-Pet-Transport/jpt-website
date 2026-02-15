import { FC, PropsWithChildren } from "react";

type BoxedContainerProps = PropsWithChildren<{
  className?: string;
  medium?: boolean;
}>;

const BoxedContainer: FC<BoxedContainerProps> = ({
  children,
  className,
  medium = false,
}) => {
  if (medium) {
    return (
      <div
        className={`${className} flex flex-col w-full py-40 gap-16 px-4
          md:max-w-5xl 
          lg:max-w-6xl 
          xl:max-w-7xl 
          2xl:max-w-360
          mx-auto`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`${className} w-full px-4
					md:max-w-3xl 
					lg:max-w-5xl 
					xl:max-w-6xl 
					2xl:max-w-7xl 
					mx-auto`}
    >
      {children}
    </div>
  );
};

export default BoxedContainer;
