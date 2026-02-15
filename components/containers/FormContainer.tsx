import { FC, PropsWithChildren } from "react";

type FormContainerProps = {
  className?: string;
};
const FormContainer: FC<PropsWithChildren<FormContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-[#F0F8FF] w-full max-w-4xl mx-auto min-h-20 rounded-3xl p-12 flex flex-col gap-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormContainer;
