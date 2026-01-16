import { FC, PropsWithChildren } from "react";

type BoxedContainerProps = PropsWithChildren<{
  className?: string;
}>;

const BoxedContainer: FC<BoxedContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full px-4
					sm:px-6
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
