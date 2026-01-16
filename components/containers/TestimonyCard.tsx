import { Testimony } from "@/models/testimony";
import { FC } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { FaStar } from "react-icons/fa";

type TestimonyCardProps = {
  testimony: Testimony;
};

const TestimonyCard: FC<TestimonyCardProps> = (props) => {
  return (
    <div className="w-96 h-44 bg-[#FEF5EE] rounded-md flex flex-col p-4">
      {/* user details */}
      <div className="flex flex-row gap-4">
        <div className="rounded-full overflow-hidden border-2 border-[#9CB8879E]">
          <Image
            priority
            src={props.testimony.user.avatar}
            alt={props.testimony.user.avatar}
            height={50}
            width={50}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <BodyText weight="semibold">{props.testimony.user.name}</BodyText>
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
      <div className=""></div>
    </div>
  );
};

export default TestimonyCard;
