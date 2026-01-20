import { FC } from "react";
import Image from "next/image";

type IconContainerProps = {
  icon: string;
};

const IconContainer: FC<IconContainerProps> = (props) => {
  const path = `/images/icons/${props.icon}.svg`;

  return <Image src={path} alt={props.icon} height={34} width={34} />;
};

export default IconContainer;
