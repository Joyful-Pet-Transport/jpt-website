import { useState } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const RecognizedByMediaSection = () => {
  const mobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Sample media items - you can replace these with your actual media
  const mediaItems = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < mediaItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (mobile) {
    return (
      <BoxedContainer>
        <Heading font="fredoka" className="text-center mb-6">
          Recognized by Trusted Media
        </Heading>
        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mediaItems.map((src, index) => (
                <div key={index} className="w-full shrink-0 aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={src}
                    width="560"
                    height="315"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>

          {/* indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#929292]" : "bg-[#D9D9D9]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </BoxedContainer>
    );
  }

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
