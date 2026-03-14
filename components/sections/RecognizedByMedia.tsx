import { useEffect, useRef, useState } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import Heading from "../elements/text/Heading";
import { useResponsive } from "@/utils/hooks/useWindowsDimensions";

const RecognizedByMediaSection = () => {
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const mediaVideoIds = ["guQ4NGkOevg", "hAY8na2bZy0"];

  const getEmbedUrl = (videoId: string) => {
    const params = new URLSearchParams({
      autoplay: "0",
      controls: "1",
      enablejsapi: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      iv_load_policy: "3",
      loop: "1",
      playlist: videoId,
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const mediaItems = mediaVideoIds.map(getEmbedUrl);

  const sendPlayerCommand = (
    iframe: HTMLIFrameElement | null,
    func: string,
    args: unknown[] = [],
  ) => {
    iframe?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  };

  useEffect(() => {
    iframeRefs.current.forEach((iframe, index) => {
      if (!iframe || index === currentIndex) return;

      sendPlayerCommand(iframe, "pauseVideo");
    });

    iframeRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

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
      type="button"
      onClick={direction === "prev" ? goToPrev : goToNext}
      disabled={
        direction === "prev"
          ? currentIndex === 0
          : currentIndex === mediaItems.length - 1
      }
      className="relative z-10 shrink-0 w-12 h-12 sm:w-10 sm:h-10 grid place-items-center rounded-full bg-white shadow-md disabled:opacity-30 transition-opacity hover:bg-gray-50 active:scale-95 touch-manipulation"
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <path
            d="M14.5 6.5L8.5 12L14.5 17.5"
            stroke="#929292"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9.5 6.5L15.5 12L9.5 17.5"
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
        <div className="space-y-4">
          <div className="relative flex items-center gap-4">
            <ArrowButton direction="prev" />
            <div className="flex-1 overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {mediaItems.map((src, index) => (
                  <div key={index} className="w-full shrink-0 aspect-video">
                    <iframe
                      ref={(element) => {
                        iframeRefs.current[index] = element;
                      }}
                      className="w-full h-full"
                      src={src}
                      title={`Recognized media video ${index + 1}`}
                      width="560"
                      height="315"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
            <ArrowButton direction="next" />
          </div>

          <div className="flex justify-center gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-[#929292]" : "bg-[#D9D9D9]"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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
                    ref={(element) => {
                      iframeRefs.current[index] = element;
                    }}
                    className="w-full h-full"
                    src={src}
                    title={`Recognized media video ${index + 1}`}
                    width="560"
                    height="315"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots + arrows below on mobile */}
          <div className="relative z-10 flex items-center justify-center gap-5 mt-5">
            <ArrowButton direction="prev" />
            <div className="flex gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-[#929292]" : "bg-[#D9D9D9]"}`}
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
