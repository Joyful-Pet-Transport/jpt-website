import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";


const Vision: FC = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-neutral-100 rounded-xl px-12 py-24 mt-32 shadow-lg">
            <Heading weight="semibold" size="medium" className="pb-6">OUR VISION</Heading>
            <BodyText className="text-center">
            To make pet travel simple, stress-free, and accessible for all  furparents—whether traveling locally or across the globe.
            </BodyText>
        </div>
    );
}

export default Vision;