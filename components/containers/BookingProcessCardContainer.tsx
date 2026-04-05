import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import Skeleton from "../elements/loader/Skeleton";
import Image from "next/image";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

type BookingProcessCardContainerProps = {
  step?: number;
  title?: string;
  description?: string;
  image?: string;
  isExpanded: boolean;
  onToggle: () => void;
  loading?: boolean;
};

const BookingProcessCardContainer: FC<BookingProcessCardContainerProps> = ({
  step,
  title,
  description,
  image,
  isExpanded,
  onToggle,
  loading = false,
}) => {
  const stepText = step ? `STEP ${step.toString().padStart(2, "0")}` : "";
  const mobile = useIsMobile();

  if (mobile && !isExpanded)
    return (
      <div
        onClick={onToggle}
        className="relative border-t border-black bg-white/20 cursor-pointer hover:bg-white/30 transition-all h-full min-h-[100px] flex flex-col"
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-4">
          <div>
            {loading ? (
              <Skeleton width="80px" height="2rem" />
            ) : (
              <Heading
                size="large"
                font="fredoka"
                textColor="text-neutral-950/70"
              >
                {stepText}
              </Heading>
            )}
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
            {loading ? (
              <Skeleton width="80px" height="80px" borderRadius="0.5rem" />
            ) : (
              image && <Image src={image} alt={image} width={80} height={80} />
            )}
            {loading ? (
              <Skeleton width="60px" height="1.5rem" className="mt-2" />
            ) : (
              <Heading
                textColor="text-neutral-950/70"
                size="large"
                font="fredoka"
              >
                {stepText}
              </Heading>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-center">
            {loading ? (
              <>
                <Skeleton width="80%" height="1.25rem" />
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="100%" height="1rem" />
              </>
            ) : (
              <>
                <Heading size="normal" font="fredoka">
                  {title}
                </Heading>
                {description && (
                  <BodyText size="small" font="poppins">
                    {description}
                  </BodyText>
                )}
              </>
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
        className="relative border-l first:border-0 border-black bg-white/20 cursor-pointer hover:bg-white/30 transition-all h-full min-h-[450px] flex-1"
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-4">
          <div className="[writing-mode:vertical-rl] rotate-180">
            {loading ? (
              <Skeleton width="60px" height="2rem" />
            ) : (
              <Heading
                size="xlarge"
                font="fredoka"
                textColor="text-neutral-950/70"
              >
                {stepText}
              </Heading>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className="relative border-l first:border-0 border-black cursor-pointer hover:bg-white/20 transition-all p-16 h-full min-h-[450px] flex-2"
    >
      <div className="flex flex-col justify-between gap-6 h-full">
        <div className="flex justify-between gap-6">
          {loading ? (
            <Skeleton width="120px" height="120px" borderRadius="0.5rem" />
          ) : (
            image && <Image src={image} alt={image} width={120} height={120} />
          )}

          <div className="shrink-0">
            {loading ? (
              <Skeleton width="80px" height="2.5rem" />
            ) : (
              <Heading
                textColor="text-neutral-950/70"
                size="xlarge"
                font="fredoka"
              >
                {stepText}
              </Heading>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <>
              <Skeleton width="80%" height="1.5rem" />
              <Skeleton width="100%" height="1rem" />
              <Skeleton width="100%" height="1rem" />
            </>
          ) : (
            <>
              <Heading size="medium" font="fredoka">
                {title}
              </Heading>
              {description && (
                <BodyText size="medium" font="fredoka">
                  {description}
                </BodyText>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingProcessCardContainer;
