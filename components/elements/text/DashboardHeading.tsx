"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import { FC, PropsWithChildren } from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

type DashboardHeadingProps = {
  title: string;
  back?: string;
};

const DashboardHeading: FC<PropsWithChildren<DashboardHeadingProps>> = ({
  children,
  title,
  back,
}) => {
  const router = useRouter();
  return (
    <BoxedContainer className="gap-8!">
      <div className="flex flex-row items-center gap-4">
        {back && (
          <IoArrowBack
            className="text-2xl"
            onClick={() => router.back() ?? router.replace(back)}
          />
        )}
        <Heading className="capitalize" size="medium">
          {title}
        </Heading>
      </div>
      {children}
    </BoxedContainer>
  );
};

export default DashboardHeading;
