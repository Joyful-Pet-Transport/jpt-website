import { FC } from "react";
import Image from "next/image";

type IconContainerProps = {
  icon: string;
  colored?: boolean;
  onPress?: () => void;
};

const IconContainer: FC<IconContainerProps> = (props) => {
  const path = props.colored
    ? `/images/icons/colored/${props.icon}.svg`
    : `/images/icons/${props.icon}.svg`;

  return (
    <Image
      onClick={props.onPress}
      src={path}
      alt={props.icon}
      height={34}
      width={34}
    />
  );
};

export default IconContainer;
