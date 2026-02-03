import { FC } from "react";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";


const Mission: FC = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-linear-to-br from-[#FFB18C] via-[#FBF2B3] to-[#6EC9FF] rounded-xl px-52 py-24 mt-32 shadow-lg">
            <Heading weight="semibold" size="medium" className="pb-6">OUR MISSION</Heading>
            <BodyText size="medium" className="text-center">
            To make pet travel simple, stress-free, and accessible for all  furparents—whether traveling locally or across the globe.
            </BodyText>
        </div>
    );
}

export default Mission;