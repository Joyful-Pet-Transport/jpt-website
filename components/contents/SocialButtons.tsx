import { FC } from "react";
import SocialButton from "../elements/button/SocialButton";

const SocialButtons: FC = () => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <SocialButton
        icon="/images/icons/colored/messenger.svg"
        onPress={() => window.open("http://m.me/joyfulpettransport", "_blank")}
      />
      <SocialButton
        icon="/images/icons/colored/facebook.svg"
        onPress={() =>
          window.open("https://www.facebook.com/joyfulpettransport", "_blank")
        }
      />
      <SocialButton
        icon="/images/icons/colored/instagram.svg"
        onPress={() =>
          window.open("https://www.instagram.com/joyfulpettransport", "_blank")
        }
      />
      <SocialButton
        icon="/images/icons/colored/tiktok.svg"
        onPress={() =>
          window.open("https://www.tiktok.com/@joyfulpettransport", "_blank")
        }
      />
    </div>
  );
};

export default SocialButtons;
