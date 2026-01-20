import { Testimony } from "@/models/testimony";
import { FC } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { FaStar } from "react-icons/fa";

type TestimonyCardProps = {
  testimony: Testimony;
};

const TestimonyCard: FC<TestimonyCardProps> = (props) => {
  const MAX_CHARS = 123;

  const truncateText = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max).trimEnd() + "..." : text;
  };

  return (
    <div className="w-96 h-52 bg-[#FEF5EE] gap-2 rounded-md flex flex-col p-4">
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
          <BodyText weight="semibold">
            {props.testimony.user?.name ?? "Anonymous"}
          </BodyText>
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: props.testimony.rating }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
        <BodyText size="small" onPress={() => {}}>
          View
        </BodyText>
      </div>
      {/* testimony */}
      <div className="flex flex-row items-center h-full gap-2">
        <div className="h-full">
          <Image
            priority
            src={"/images/icons/quote-up.svg"}
            alt={"quote up"}
            height={24}
            width={24}
          />
        </div>
        <div className="flex flex-1 items-center">
          <BodyText className="text-justify text-clip truncate text-wrap">
            {truncateText(props.testimony.testimony, MAX_CHARS)}
          </BodyText>
        </div>
        <div className="h-full flex flex-col justify-end">
          <Image
            priority
            src={"/images/icons/quote-down.svg"}
            alt={"quote up"}
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;
