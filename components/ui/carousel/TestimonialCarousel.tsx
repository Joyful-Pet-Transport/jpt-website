"use client";

import { FC, useEffect, useRef } from "react";
import { GoogleReview } from "@/models/google-reviews";
import TestimonyCard from "@/components/containers/TestimonyCard";

interface TestimonialCarouselProps {
  reviews: GoogleReview[];
  direction?: "forward" | "backward";
  speed?: number; // pixels per second
}

const TestimonialCarousel: FC<TestimonialCarouselProps> = ({
  reviews,
  direction = "forward",
  speed = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!container || isDraggingRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Update scroll position
      const increment = speed * deltaTime * (direction === "forward" ? 1 : -1);
      scrollPositionRef.current += increment;

      // Get the total width of all items
      const scrollWidth = container.scrollWidth / 2; // Divide by 2 because we duplicate

      // Loop the scroll
      if (scrollPositionRef.current >= scrollWidth) {
        scrollPositionRef.current = 0;
      } else if (scrollPositionRef.current < 0) {
        scrollPositionRef.current = scrollWidth;
      }

      // Apply transform
      container.style.transform = `translateX(-${scrollPositionRef.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollStartRef.current = scrollPositionRef.current;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const diff = startXRef.current - e.pageX;
    scrollPositionRef.current = scrollStartRef.current + diff;
    // Apply transform immediately for responsive feedback
    containerRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX;
    scrollStartRef.current = scrollPositionRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const diff = startXRef.current - e.touches[0].pageX;
    scrollPositionRef.current = scrollStartRef.current + diff;
    // Apply transform immediately for responsive feedback
    containerRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Duplicate reviews for infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        ref={containerRef}
        className="flex will-change-transform"
        style={{ touchAction: "none" }}
      >
        {duplicatedReviews?.map((data: GoogleReview, key) => (
          <div key={key} className="flex-[0_0_auto] min-w-0 px-3">
            <TestimonyCard review={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
