import Image from "next/image";
import { FC } from "react";
import BodyText from "../elements/text/BodyText";

type ServiceCardContainerProps = {
  title: string;
  description: string;
  image: string; // URL or file path
};

const ServiceCardContainer: FC<ServiceCardContainerProps> = (props) => {
  return (
    <div className="flex flex-1 relative">
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-[#BBE2FC] rounded-lg" />
      <div className="flex flex-col w-full h-full items-center gap-4 p-8 relative z-10">
        <div className="rounded-full overflow-hidden border-8 border-[#F37E48] aspect-square">
          <Image src={props.image} alt={props.title} height={170} width={170} />
        </div>
        <BodyText
          className="uppercase text-center"
          weight="semibold"
          size="medium"
        >
          {props.title}
        </BodyText>
        <BodyText className="text-center">{props.description}</BodyText>
      </div>
    </div>
  );
};

export default ServiceCardContainer;
