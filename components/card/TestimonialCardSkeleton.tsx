import { FC } from "react";
import Skeleton from "../elements/loader/Skeleton";

const TestimonialCardSkeleton: FC = () => {
  return (
    <div className="w-full bg-[#F0F8FF] gap-4 rounded-2xl flex flex-col p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton width={48} height={48} borderRadius="9999px" />
          <div className="flex flex-col gap-2">
            <Skeleton width={120} height={16} />
            <Skeleton width={90} height={12} />
          </div>
        </div>
        <Skeleton width={80} height={16} />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton width="100%" height={12} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="75%" height={12} />
      </div>

      <Skeleton width="100%" height={192} borderRadius="1rem" />
    </div>
  );
};

export default TestimonialCardSkeleton;