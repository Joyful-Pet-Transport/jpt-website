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
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 4,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
    {
      user: { name: "charl", avatar: "/images/logo/logo.png", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
  ];

  return (
    <div className="flex gap-6">
      {TestimonialData.map((data, key) => (
        <TestimonyCard testimony={data} key={key} />
      ))}
    </div>
  );
};

export default TestimonialContents;
