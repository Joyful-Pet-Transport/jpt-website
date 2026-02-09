import Image from "next/image";
import { FC } from "react";
import BodyText from "../elements/text/BodyText";

type ServicePageImageContainerProps = {
  title: string;
  description: string;
  image: string; // URL or file path
  onPress?: () => void;
};

const ServicePageImageContainer: FC<ServicePageImageContainerProps> = (
  props,
) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex rounded-full border-6 border-dashed p-2 border-[#055D9F]">
        <div
          className="relative flex w-100 h-100 rounded-full border-8 border-[#F37E48] justify-center items-center overflow-hidden"
          onClick={props.onPress}
        >
          <Image
            src={props.image}
            alt={props.title}
            height={500}
            width={500}
            className="aspect-square"
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center items-center bg-black/60 py-6 min-h-24">
            <BodyText
              className="text-center uppercase"
              white
              size="medium"
              weight="semibold"
            >
              {props.title}
            </BodyText>
          </div>
        </div>
      </div>
      <BodyText className="text-center">{props.description}</BodyText>
    </div>
  );
};

export default ServicePageImageContainer;
