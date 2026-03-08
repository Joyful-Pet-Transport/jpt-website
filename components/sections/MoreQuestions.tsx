import { FC } from "react";
import DynamicButton from "../elements/button/DynamicButton";
import BodyText from "../elements/text/BodyText";
import { useRouter } from "next/navigation";

const MoreQuestions: FC = () => {
  const router = useRouter();

  return (
    <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl bg-secondary/80 px-6 py-8 text-center md:mt-16 md:gap-8 md:px-8 md:py-8 md:pb-10">
      <div>
        <BodyText weight="semibold" size="medium">
          Still have questions?
        </BodyText>
        <BodyText weight="normal" size="normal">
          Can't find the answer you're looking for? Please chat to our friendly
          team.
        </BodyText>
      </div>
      <DynamicButton onPress={() => router.push("/contact-us")}>
        Get in touch
      </DynamicButton>
    </div>
  );
};

export default MoreQuestions;
