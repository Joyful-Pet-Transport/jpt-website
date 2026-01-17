"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { Testimony } from "@/models/testimony";
import { FC } from "react";
import TestimonyCard from "../containers/TestimonyCard";

const TestimonialContents: FC = () => {
  const TestimonialData: Testimony[] = [
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 4,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Marquee>
        <MarqueeContent>
          {TestimonialData.map((data, key) => (
            <MarqueeItem key={key}>
              <TestimonyCard testimony={data} />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
      <Marquee>
        <MarqueeContent direction="right">
          {TestimonialData.map((data, key) => (
            <MarqueeItem key={key}>
              <TestimonyCard testimony={data} />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

export default TestimonialContents;
