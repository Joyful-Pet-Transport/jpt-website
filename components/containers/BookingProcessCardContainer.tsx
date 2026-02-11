import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import Image from "next/image";

type BookingProcessCardContainerProps = {
  step: number;
  title: string;
  description?: string;
  image?: string;
  isExpanded: boolean;
  onToggle: () => void;
};

const BookingProcessCardContainer: FC<BookingProcessCardContainerProps> = ({
  step,
  title,
  description,
  image,
  isExpanded,
  onToggle,
}) => {
  const stepText = `STEP ${step.toString().padStart(2, "0")}`;

  if (!isExpanded) {
    return (
      <div
        onClick={onToggle}
        className="relative border border-black bg-white/50 cursor-pointer hover:bg-gray-50 transition-all h-full min-h-[400px] flex-1"
      >
        <div className="absolute left-30 top-0 bottom-0 flex items-center justify-center px-4">
          <div className="[writing-mode:vertical-rl] rotate-180">
            <Heading>{stepText}</Heading>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className="relative border border-black cursor-pointer hover:bg-gray-50 transition-all p-8 h-full min-h-[400px] flex-2"
    >
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-6">
          {image && (
            <div className="shrink-0 w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center overflow-hidden">
              <Image src={image} alt={title} width={32} height={32} />
            </div>
          )}

          <div className="shrink-0">
            <Heading className="text-4xl font-bold">{stepText}</Heading>
          </div>
        </div>

        <div className="flex-1">
          <Heading className="text-2xl font-bold mb-3">{title}</Heading>
          {description && (
            <BodyText className="text-gray-700 leading-relaxed">
              {description}
            </BodyText>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingProcessCardContainer;
