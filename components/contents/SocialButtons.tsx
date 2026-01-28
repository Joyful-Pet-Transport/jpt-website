import { FC } from "react";
import SocialButton from "../elements/button/SocialButton";

const SocialButtons: FC = () => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <SocialButton
        icon="/images/icons/colored/messenger.svg"
        onPress={() => {}}
      />
      <SocialButton
        icon="/images/icons/colored/facebook.svg"
        onPress={() => {}}
      />
      <SocialButton
        icon="/images/icons/colored/instagram.svg"
        onPress={() => {}}
      />
      <SocialButton
        icon="/images/icons/colored/tiktok.svg"
        onPress={() => {}}
      />
    </div>
  );
};

export default SocialButtons;
