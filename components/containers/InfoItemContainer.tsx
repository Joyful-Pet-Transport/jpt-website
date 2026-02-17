import { FC, ReactElement } from "react";
import BodyText from "../elements/text/BodyText";

type InfoItemContainerProps = {
  icon: ReactElement;
  name: string;
  value: string;
  onPress?: () => void;
};
const InfoItemContainer: FC<InfoItemContainerProps> = (props) => {
  return (
    <div
      onClick={props.onPress}
      className="flex flex-row w-full gap-6 items-center"
    >
      {props.icon}
      <div className="flex flex-col">
        <BodyText size="xsmall">{props.name}</BodyText>
        <BodyText font="fredoka" weight="semibold" size="large">
          {props.value}
        </BodyText>
      </div>
    </div>
  );
};

export default InfoItemContainer;
