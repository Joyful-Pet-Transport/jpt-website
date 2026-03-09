import { useState } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

const RecognizedByMediaSection = () => {
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const mediaItems = [
    "https://www.youtube.com/embed/guQ4NGkOevg",
    "https://www.youtube.com/embed/hAY8na2bZy0",
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

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < mediaItems.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const ArrowButton = ({ direction }: { direction: "prev" | "next" }) => (
    <button
      onClick={direction === "prev" ? goToPrev : goToNext}
      disabled={
        direction === "prev"
          ? currentIndex === 0
          : currentIndex === mediaItems.length - 1
      }
      className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md disabled:opacity-30 transition-opacity hover:bg-gray-50"
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        {direction === "prev" ? (
          <path
            d="M13 4L7 10L13 16"
            stroke="#929292"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M7 4L13 10L7 16"
            stroke="#929292"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );

  return (
    <BoxedContainer className="pb-12">
      <Heading font="fredoka" className="text-center">
        Recognized by Trusted Media
      </Heading>

      {/* Desktop/Tablet: arrows flanking the video */}
      {!isMobile ? (
        <div className="relative flex items-center gap-4">
          <ArrowButton direction="prev" />
          <div className="flex-1">
            <div className="overflow-hidden rounded-3xl">
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
            <div className="flex justify-center gap-2 mt-4">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex ? "bg-[#929292]" : "bg-[#D9D9D9]"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <ArrowButton direction="next" />
        </div>
      ) : (
        /* Mobile: swipeable video, dots + arrows below */
        <div>
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

          {/* Dots + arrows below on mobile */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <ArrowButton direction="prev" />
            <div className="flex gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex ? "bg-[#929292]" : "bg-[#D9D9D9]"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <ArrowButton direction="next" />
          </div>
        </div>
      )}
    </BoxedContainer>
  );
};

export default RecognizedByMediaSection;
