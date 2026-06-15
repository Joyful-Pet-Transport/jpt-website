import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import BodyText from "../elements/text/BodyText";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { GoogleReview } from "@/models/google-reviews";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

type TestimonyCardProps = {
  review: GoogleReview;
};

const TestimonyCard: FC<TestimonyCardProps> = ({ review }) => {
  const mobile = useIsMobile();
  const MAX_CHARS = mobile ? 80 : 115;
  const reviewPath = `/testimonials/${encodeURIComponent(review._id)}`;
  const truncateText = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max).trimEnd() + "..." : text;
  };

  if (mobile) {
    return (
      <div className="w-70 h-60 justify-between bg-[#FFFFFF] gap-2 rounded-3xl flex flex-col p-8 pointer-events-none">
        <div className="flex items-center justify-between text-yellow-400">
          <div className="flex gap-1">
            {Array.from({ length: review.stars }).map((_, i) => (
              <FaStar key={i} size={18} />
            ))}
          </div>
          <Link
            href={reviewPath}
            aria-label="Open full review"
            className="pointer-events-auto text-blue-500"
          >
            <FaExternalLinkAlt size={15} />
          </Link>
        </div>
        {/* testimony */}
        <div className="flex flex-row items-center justify-center h-full gap-2">
          <BodyText className="text-justify lowercase">
            "{truncateText(review?.text ?? "", MAX_CHARS)}"
          </BodyText>
        </div>
        {/* user details */}
        <div className="flex flex-row items-center justify-center gap-4">
        <div className="rounded-full overflow-hidden border-2 border-[#9CB8879E] w-[35px] h-[35px]">
          <img
            src={review.reviewerPhotoUrl ?? ""}
            alt={review.name ?? "Reviewer"}
            className="w-full h-full object-cover"
          />
        </div>
          <div className="flex flex-col">
            <BodyText
              className="capitalize"
              weight="semibold"
              font="fredoka"
              size="medium"
            >
              {truncateText(review?.name ?? "", 15) ?? "Anonymous"}
            </BodyText>
            {/* <BodyText size="small" font="poppins">
            Joyful Pet Transport
          </BodyText> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 min-h-64 justify-between bg-[#FFFFFF] gap-2 rounded-3xl flex flex-col p-8 pointer-events-none">
      <div className="flex items-center justify-between text-yellow-400">
        <div className="flex gap-1">
          {Array.from({ length: review.stars }).map((_, i) => (
            <FaStar key={i} size={20} />
          ))}
        </div>
        <Link
          href={reviewPath}
          aria-label="Open full review"
          className="pointer-events-auto text-blue-500"
        >
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
      {/* testimony */}
      <div className="flex flex-row items-center h-full gap-2">
        <BodyText className="text-justify lowercase">
          "{truncateText(review?.text ?? "", MAX_CHARS)}"
        </BodyText>
      </div>
      {/* user details */}
      <div className="flex flex-row items-center gap-4">
      <div className="rounded-full overflow-hidden border-2 border-[#9CB8879E] w-[50px] h-[50px]">
        <img
          src={review.reviewerPhotoUrl ?? ""}
          alt={review.name ?? "Reviewer"}
          className="w-full h-full object-cover"
        />
      </div>
        <div className="flex flex-col">
          <BodyText
            className="capitalize"
            weight="semibold"
            font="fredoka"
            size="large"
          >
            {truncateText(review?.name ?? "", 15) ?? "Anonymous"}
          </BodyText>
          {/* <BodyText size="small" font="poppins">
            Joyful Pet Transport
          </BodyText> */}
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;
