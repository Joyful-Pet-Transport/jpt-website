import DynamicButton from "@/components/elements/button/DynamicButton";
import BodyText from "@/components/elements/text/BodyText";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";
import { FC } from "react";

type ButtonsProps = {
  step: number;
  setStep: (s: any) => void;
  onSubmit: () => void;
  loading: boolean;
  maxSteps: number;
};

const FormButtons: FC<ButtonsProps> = ({
  step,
  setStep,
  onSubmit,
  loading,
  maxSteps,
}) => {
  const responsive = useResponsive();
  const scrollToTop = () => {
    window.scrollTo({ top: 630, behavior: "smooth" });
  };

  return (
    <div className="flex w-full justify-between items-center">
      <BodyText
        size={responsive.isTabletOrMobile ? "normal" : "medium"}
        weight="semibold"
        className={step <= 1 ? "text-neutral-400! select-none" : "select-none"}
        onPress={() => {
          if (step !== 1) {
            setStep(step - 1);
            scrollToTop();
          }
        }}
      >
        BACK
      </BodyText>
      <DynamicButton
        size={responsive.isTabletOrMobile ? "medium" : "default"}
        onPress={() => {
          if (step === maxSteps) {
            onSubmit();
          } else {
            setStep(step + 1);
            scrollToTop();
          }
        }}
      >
        {step === maxSteps ? (loading ? "SUBMITTING" : "SUBMIT") : "NEXT"}
      </DynamicButton>
    </div>
  );
};

export default FormButtons;
