import { FC } from "react";
import Skeleton from "./Skeleton";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const TestimonialLoading: FC = () => {
  const mobile = useIsMobile();

  const SkeletonTestimonialItem = () => (
    <div className="flex flex-col gap-3 p-6 bg-white rounded-lg border border-neutral-100 min-w-max">
      <div className="flex gap-3">
        <Skeleton width="2.5rem" height="2.5rem" borderRadius="50%" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton width="100px" height="1rem" />
          <Skeleton width="80px" height="0.875rem" />
        </div>
      </div>
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="90%" height="1rem" />
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="1rem" height="1rem" borderRadius="0.25rem" />
        ))}
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="flex flex-row gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-max">
            <SkeletonTestimonialItem />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-max">
            <SkeletonTestimonialItem />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-max">
            <SkeletonTestimonialItem />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialLoading;
