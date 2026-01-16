import { FC } from "react";
import ServiceCardContainer from "../containers/ServiceCardContainer";

const OurServiceContents: FC = () => {
  // this array variable is pansamantala, would change after convex setup
  const ServiceData = [
    {
      title: "International Pet Relocation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/logo/logo.png",
    },
    {
      title: "domestic Pet Relocation (PHILIPPINES)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/logo/logo.png",
    },
    {
      title: "RABIES SEROLOGY TEST",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/logo/logo.png",
    },
  ];
  return (
    <div className="w-full flex gap-8">
      {ServiceData.map((data, key) => (
        <ServiceCardContainer
          key={key}
          title={data.title}
          description={data.description}
          image={data.image}
        />
      ))}
    </div>
  );
};
export default OurServiceContents;
