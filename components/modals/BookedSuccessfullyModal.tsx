"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import BodyText from "../elements/text/BodyText";
import DynamicButton from "../elements/button/DynamicButton";
import useModal from "@/utils/hooks/useModal";

const BookedSuccessfullyModal: FC = () => {
  const router = useRouter();
  const modal = useModal();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6 max-w-lg mx-auto">
      <div className="h-24 w-24 rounded-full bg-green-400 flex justify-center items-center">
        <FaCheck className="text-5xl text-white" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <BodyText
          className="uppercase text-center"
          size="medium"
          font="fredoka"
          weight="bold"
        >
          🐾 Your Pet’s Journey Starts Here 🐾
        </BodyText>
        <BodyText className="text-center">
          Your pet relocation inquiry has been successfully submitted.
        </BodyText>
      </div>
      <div className="flex flex-col gap-2">
        <BodyText className="text-center">
          Thank you for choosing us. Our team will review your details and
          contact you shortly with an update.
        </BodyText>
        <BodyText className="text-center">
          Please keep your lines open for our call or message.
        </BodyText>
      </div>
      <BodyText className="text-center">
        We’re excited to assist you every step of the way.
      </BodyText>
      <DynamicButton
        onPress={() => {
          router.push("/");
          modal.setShown(false);
        }}
      >
        go back home
      </DynamicButton>
    </div>
  );
};

export default BookedSuccessfullyModal;
