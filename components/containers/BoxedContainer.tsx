import { FC, PropsWithChildren } from "react";

type BoxedContainerProps = PropsWithChildren<{
  className?: string;
}>;

const BoxedContainer: FC<BoxedContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full px-4
					sm:px-6
					md:max-w-3xl md:px-6
					lg:max-w-5xl lg:px-8
					xl:max-w-6xl xl:px-12
					2xl:max-w-7xl 2xl:px-16
					mx-auto`}
    >
      {children}
    </div>
  );
};

export default BoxedContainer;
