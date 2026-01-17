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
      className="flex flex-row w-full gap-2 items-center"
    >
      {props.icon}
      <div className="flex flex-col">
        <BodyText white size="xsmall">
          {props.name}
        </BodyText>
        <BodyText white>{props.value}</BodyText>
      </div>
    </div>
  );
};

export default InfoItemContainer;
