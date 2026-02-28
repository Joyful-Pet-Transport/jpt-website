import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import Image from "next/image";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

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
  const mobile = useIsMobile();

  if (mobile && !isExpanded)
    return (
      <div
        onClick={onToggle}
        className="relative border-t border-black bg-white/20 cursor-pointer hover:bg-white/30 transition-all h-full min-h-[100px] flex flex-col"
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-4">
          <div>
            <Heading
              size="large"
              font="fredoka"
              textColor="text-neutral-950/70"
            >
              {stepText}
            </Heading>
          </div>
        </div>
      </div>
    );

  if (mobile) {
    return (
      <div
        onClick={onToggle}
        className="relative border-t border-black cursor-pointer hover:bg-white/20 transition-all p-4 h-full min-h-[100px]"
      >
        <div className="flex flex-row gap-6 h-full">
          <div className="flex flex-col items-center justify-center">
            {image && <Image src={image} alt={image} width={80} height={80} />}
            <Heading
              textColor="text-neutral-950/70"
              size="large"
              font="fredoka"
            >
              {stepText}
            </Heading>
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-center">
            <Heading size="normal" font="fredoka">
              {title}
            </Heading>
            {description && (
              <BodyText size="small" font="poppins">
                {description}
              </BodyText>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div
        onClick={onToggle}
        className="relative border-l first:border-0 border-black bg-white/20 cursor-pointer hover:bg-white/30 transition-all h-full min-h-[400px] flex-1"
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-4">
          <div className="[writing-mode:vertical-rl] rotate-180">
            <Heading
              size="xlarge"
              font="fredoka"
              textColor="text-neutral-950/70"
            >
              {stepText}
            </Heading>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className="relative border-l first:border-0 border-black cursor-pointer hover:bg-white/20 transition-all p-16 h-full min-h-[400px] flex-2"
    >
      <div className="flex flex-col justify-between gap-6 h-full">
        <div className="flex justify-between gap-6">
          {image && <Image src={image} alt={image} width={120} height={120} />}

          <div className="shrink-0">
            <Heading
              textColor="text-neutral-950/70"
              size="xlarge"
              font="fredoka"
            >
              {stepText}
            </Heading>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Heading size="medium" font="fredoka">
            {title}
          </Heading>
          {description && (
            <BodyText size="medium" font="fredoka">
              {description}
            </BodyText>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingProcessCardContainer;
