import { FC } from "react"
import DynamicButton from "../elements/button/DynamicButton";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";

const MoreQuestions: FC = () => {
    return (
        <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl bg-secondary/60 px-6 py-8 text-center md:mt-16 md:gap-8 md:px-8 md:py-8 md:pb-10">
                    <div>
                        <BodyText weight="semibold" size="medium">Still have questions?</BodyText>
                        <BodyText weight="normal" size="normal">Can't find the answer you're looking for? Please chat to our friendly team.</BodyText>
                    </div>
                    <DynamicButton>Get in touch</DynamicButton>
                </div>
    );
}

export default MoreQuestions;

