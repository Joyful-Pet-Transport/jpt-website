import { FC } from "react";
import BookingProcessCardContainer from "../containers/BookingProcessCardContainer";
import DynamicButton from "../elements/button/DynamicButton";

const BookingProcessContent: FC = () => {
  // this array variable is pansamantala, would change after convex setup
  const ProcessData = [
    {
      step: 1,
      title: "Fill out our reservation form",
    },
    {
      step: 2,
      title: "Let us know everything about your pet and your travel",
    },
    {
      step: 3,
      title: "We’ll schedule everything for you",
    },
    {
      step: 4,
      title: "You can now prepare for your travel",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-12">
      {ProcessData.map((data) => (
        <BookingProcessCardContainer step={data.step} title={data.title} />
      ))}
      <div className="w-1/3 self-center">
        <DynamicButton>Book your pet's journey now</DynamicButton>
      </div>
    </div>
  );
};
export default BookingProcessContent;
