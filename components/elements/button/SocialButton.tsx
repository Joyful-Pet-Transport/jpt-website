import { FC } from "react";
import Image from "next/image";

type SocialButtonProps = {
  onPress: () => void;
  icon: string;
};

const SocialButton: FC<SocialButtonProps> = (props) => {
  return (
    <div
      onClick={props.onPress}
      className="w-14 h-14 bg-white rounded-full overflow-hidden flex justify-center items-center"
    >
      <Image src={props.icon} alt={props.icon} height={32} width={32} />
    </div>
  );
};

export default SocialButton;
