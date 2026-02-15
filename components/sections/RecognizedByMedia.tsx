import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";

const RecognizedByMediaSection = () => {
  return (
    <BoxedContainer>
      <Heading font="fredoka" className="text-center">
        Recognized by Trusted Media
      </Heading>
      <div className="aspect-video rounded-4xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          width="560"
          height="315"
          allowFullScreen
        />
      </div>
    </BoxedContainer>
  );
};

export default RecognizedByMediaSection;
