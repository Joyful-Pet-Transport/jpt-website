"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import { useAuthToken } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  return (
    <PageWrapperContainer>
      <BoxedContainer>
        <BodyText>Hello</BodyText>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default DashboardPage;
