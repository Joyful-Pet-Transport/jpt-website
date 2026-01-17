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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
