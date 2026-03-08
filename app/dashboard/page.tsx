"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import Heading from "@/components/elements/text/Heading";

const DashboardPage = () => {
  return (
    <PageWrapperContainer removeBg disableLayout>
      <div className="flex flex-col h-screen bg-neutral-100 mx-8 rounded-4xl">
        <BoxedContainer>
          <Heading size="medium">Dashboard</Heading>
        </BoxedContainer>
      </div>
    </PageWrapperContainer>
  );
};

export default DashboardPage;
