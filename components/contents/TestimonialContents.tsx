"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { FC } from "react";
import TestimonyCard from "../containers/TestimonyCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GoogleReview } from "@/models/google-reviews";

const TestimonialContents: FC = () => {
  const reviews = useQuery(api.tables.google_reviews.get);
  // const TestimonialData: Testimony[] = [
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 5,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 5,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 4,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 5,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 5,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
  //     rating: 5,
  //     date: "2025-12-12",
  //     attachment: ["mema", "mema"],
  //     testimony:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-6">
      <Marquee>
        <MarqueeContent>
          {reviews?.map((data: GoogleReview, key) => (
            <MarqueeItem key={key}>
              <TestimonyCard review={data} />
            </MarqueeItem>
          )) || []}
        </MarqueeContent>
      </Marquee>
      <Marquee>
        <MarqueeContent direction="right">
          {reviews?.map((data: GoogleReview, key) => (
            <MarqueeItem key={key}>
              <TestimonyCard review={data} />
            </MarqueeItem>
          )) || []}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

export default TestimonialContents;
