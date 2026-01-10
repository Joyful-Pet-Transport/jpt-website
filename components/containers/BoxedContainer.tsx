import { FC, PropsWithChildren } from "react";

type BoxedContainerProps = PropsWithChildren<{
  className?: string;
}>;

const BoxedContainer: FC<BoxedContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full px-4
					sm:px-8
					md:max-w-3xl md:px-8
					lg:max-w-[1200px] lg:px-12
					xl:max-w-[1400px] xl:px-16
					2xl:max-w-[1800px] 2xl:px-20
					3xl:max-w-[2200px] 3xl:px-24
					mx-auto`}
    >
      {children}
    </div>
  );
};

export default BoxedContainer;
