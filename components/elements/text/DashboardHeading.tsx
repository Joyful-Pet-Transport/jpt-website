import BoxedContainer from "@/components/containers/BoxedContainer";
import { FC, PropsWithChildren } from "react";
import Heading from "./Heading";

type DashboardHeadingProps = {
  title: string;
};

const DashboardHeading: FC<PropsWithChildren<DashboardHeadingProps>> = ({
  children,
  title,
}) => {
  return (
    <BoxedContainer className="gap-8!">
      <Heading className="capitalize" size="medium">
        {title}
      </Heading>
      {children}
    </BoxedContainer>
  );
};

export default DashboardHeading;
