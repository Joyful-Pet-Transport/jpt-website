import { FC } from "react";

type ServiceCardContainerProps = {
  title: string;
  description: string;
  image: string; // URL or file path
};

const ServiceCardContainer: FC<ServiceCardContainerProps> = (props) => {
  return <div className="flex-1"></div>;
};

export default ServiceCardContainer;
