import { FC, useState } from "react";
import FormContainer from "../containers/FormContainer";
import BodyText from "../elements/text/BodyText";

type InternationalPetRelocationFormProps = {
  type: string;
};

const RelocationForm: FC = () => {
  const [step, setStep] = useState<number>(1);

  if (step === 1) {
    return <Destination />;
  }

  if (step === 2) {
    return <Destination />;
  }

  if (step === 3) {
    return <Destination />;
  }

  if (step === 4) {
    return <Destination />;
  }

  return <Review />;
};

const Destination: FC = () => {
  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        Destination
      </BodyText>
      <BodyText size="medium" weight="semibold" className="uppercase">
        Where are the origin and destination countries?
      </BodyText>
    </FormContainer>
  );
};

const Review: FC = () => {
  return (
    <FormContainer>
      <BodyText size="large" weight="semibold" className="text-center">
        Hello
      </BodyText>
    </FormContainer>
  );
};

const InternationalPetRelocationForm: FC<
  InternationalPetRelocationFormProps
> = ({ type }) => {
  if (type === "import") {
    return <RelocationForm />;
  }

  if (type === "export") {
    return <RelocationForm />;
  }

  return (
    <FormContainer className="justify-center items-center">
      <BodyText weight="bold">Invalid Form</BodyText>
    </FormContainer>
  );
};

export default InternationalPetRelocationForm;
