import { Testimony } from "@/models/testimony";
import { FC } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { FaStar } from "react-icons/fa";

type TestimonyCardProps = {
  testimony: Testimony;
};

const TestimonyCard: FC<TestimonyCardProps> = (props) => {
  const MAX_CHARS = 115;
  const truncateText = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max).trimEnd() + "..." : text;
  };

  return (
    <div className="w-96 bg-[#FFFFFF] gap-2 rounded-3xl flex flex-col p-8">
      <div className="flex gap-1 text-yellow-400">
        {Array.from({ length: props.testimony.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      {/* testimony */}
      <div className="flex flex-row items-center h-full gap-2">
        <BodyText className="text-justify">
          "{truncateText(props.testimony.testimony, MAX_CHARS)}"
        </BodyText>
      </div>
      {/* user details */}
      <div className="flex flex-row gap-4">
        <div className="rounded-full overflow-hidden border-2 border-[#9CB8879E]">
          <Image
            priority
            src={props.testimony.user?.avatar ?? ""}
            alt={props.testimony.user?.avatar ?? ""}
            height={50}
            width={50}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <BodyText weight="semibold" font="fredoka" size="large">
            {props.testimony.user?.name ?? "Anonymous"}
          </BodyText>
          <BodyText size="small" font="poppins">
            Joyful Pet Transport
          </BodyText>
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;
