import { Testimony } from "@/models/testimony";
import { FC } from "react";

const TestimonialContents: FC = () => {
  const TestimonialData: Testimony[] = [
    {
      user: { name: "charl", avatar: "mema", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
    {
      user: { name: "charl", avatar: "mema", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
    {
      user: { name: "charl", avatar: "mema", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
    {
      user: { name: "charl", avatar: "mema", email: "email" },
      rating: 5,
      date: "2025-12-12",
      attachment: ["mema", "mema"],
    },
  ];

  return <div></div>;
};

export default TestimonialContents;
