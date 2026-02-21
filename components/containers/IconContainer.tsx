import { FC } from "react";
import Image from "next/image";

type IconContainerProps = {
  icon: string;
  colored?: boolean;
};

const IconContainer: FC<IconContainerProps> = (props) => {
  const path = props.colored
    ? `/images/icons/colored/${props.icon}.svg`
    : `/images/icons/${props.icon}.svg`;

  return <Image src={path} alt={props.icon} height={34} width={34} />;
};

export default IconContainer;
