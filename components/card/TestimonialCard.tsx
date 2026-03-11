import { FC, useState } from "react";
import Image from "next/image";
import BodyText from "../elements/text/BodyText";
import { FaStar } from "react-icons/fa";
import { GoogleReview } from "@/models/google-reviews";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type TestimonialCardProps = {
  review: GoogleReview;
};

const TestimonialCard: FC<TestimonialCardProps> = ({ review }) => {
  const mobile = useIsMobile();
  const MAX_CHARS = mobile ? 100 : 200;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const images = review.reviewImageUrls || [];
  const hasImages = images.length > 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const text = review?.text ?? "";
  const isLong = hasImages && text.length > MAX_CHARS;
  const displayText =
    isLong && !expanded ? text.slice(0, MAX_CHARS).trimEnd() + "..." : text;

  const truncateName = (name: string, max: number) =>
    name.length > max ? name.slice(0, max).trimEnd() + "..." : name;

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  if (mobile) {
    return (
      <div className="w-full min-h-96 bg-[#F0F8FF] gap-4 rounded-3xl flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden border-2 border-white min-w-10 min-h-10">
              {review.reviewerPhotoUrl ? (
                <Image
                  priority
                  src={review.reviewerPhotoUrl}
                  alt={review.name ?? ""}
                  height={40}
                  width={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#9CB887] flex items-center justify-center text-white font-semibold text-sm">
                  {(review.name || "A").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <BodyText
                className="capitalize text-gray-800"
                weight="semibold"
                font="fredoka"
                size="normal"
              >
                {truncateName(review?.name ?? "Anonymous", 15)}
              </BodyText>
              <BodyText size="small" className="text-gray-600">
                {formatDate(review.publishedAtDate)}
              </BodyText>
            </div>
          </div>
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: review.stars }).map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
        </div>

        {/* Testimonial text */}
        <div className="flex-1">
          <BodyText className="text-gray-700 text-sm leading-relaxed">
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="ml-1 text-blue-500 hover:text-blue-700 font-medium text-sm"
              >
                {expanded ? "See less" : "See more"}
              </button>
            )}
          </BodyText>
        </div>

        {/* Image carousel */}
        {images.length > 0 && (
          <div className="relative overflow-hidden bg-gray-200 h-48">
            <Image
              src={images[currentImageIndex]}
              alt="testimonial"
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 rounded-full p-2 hover:bg-white"
                >
                  <IoChevronBack className="text-white" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 rounded-full p-2 hover:bg-white"
                >
                  <IoChevronForward className="text-white" size={20} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[450px] bg-[#F0F8FF] gap-4 rounded-2xl flex flex-col p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12">
            {review.reviewerPhotoUrl ? (
              <Image
                priority
                src={review.reviewerPhotoUrl}
                alt={review.name ?? ""}
                height={48}
                width={48}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#9CB887] flex items-center justify-center text-white font-semibold">
                {(review.name || "A").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <BodyText
              className="capitalize text-gray-800"
              weight="semibold"
              font="fredoka"
              size="large"
            >
              {truncateName(review?.name ?? "Anonymous", 15)}
            </BodyText>
            <BodyText size="small" className="text-gray-600">
              {formatDate(review.publishedAtDate)}
            </BodyText>
          </div>
        </div>
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: review.stars }).map((_, i) => (
            <FaStar key={i} size={16} />
          ))}
        </div>
      </div>

      {/* Testimonial text */}
      <div className="flex-1">
        <BodyText className="text-gray-700 leading-relaxed">
          {displayText}
          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="ml-1 text-blue-500 hover:text-blue-700 font-medium"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </BodyText>
      </div>

      {/* Image carousel */}
      {images.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gray-200 h-96">
          <Image
            src={images[currentImageIndex]}
            alt="testimonial"
            fill
            className="object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 rounded-full p-2 hover:bg-black/40"
              >
                <IoChevronBack className="text-white text-center" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 rounded-full p-2 hover:bg-black/40"
              >
                <IoChevronForward
                  className="text-white text-center"
                  size={24}
                />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
