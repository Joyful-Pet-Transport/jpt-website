"use client";

import { FC } from "react";
import ServiceCardContainer from "../containers/ServiceCardContainer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "../elements/loader/Loader";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const OurServiceContents: FC = () => {
  const services = useQuery(api.tables.services.get);
  const mobile = useIsMobile();

  if (services === undefined) {
    return <Loader />;
  }

  return (
    <div className={`w-full flex gap-6 ${mobile && "flex-col"}`}>
      {services?.map(({ _id, title, description, image }) => (
        <ServiceCardContainer
          key={_id}
          title={title}
          description={description}
          image={image}
        />
      ))}
    </div>
  );
};
export default OurServiceContents;
