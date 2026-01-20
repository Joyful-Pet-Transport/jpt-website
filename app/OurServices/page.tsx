import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";

const OurServicesScreen = () => {
  return (
    <PageWrapperContainer className="items-center">
      <BoxedContainer medium>
        <div className="flex flex-col justify-center items-center">
          <Heading className="text-center">Our Services</Heading>
          <BodyText className="text-center">
            Explore our pet relocation services with smooth, a walkthrough to
            our service to make every journey safe and stress-free.
          </BodyText>
        </div>
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default OurServicesScreen;
