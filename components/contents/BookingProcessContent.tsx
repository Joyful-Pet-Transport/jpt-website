import { FC } from "react";
import BookingProcessCardContainer from "../containers/BookingProcessCardContainer";
import DynamicButton from "../elements/button/DynamicButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "../elements/loader/Loader";

const BookingProcessContent: FC = () => {
  const bookingProcess = useQuery(api.tables.booking_process.get);

  if (bookingProcess === undefined) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col gap-12">
      {bookingProcess?.map(({ _id, step, title }) => (
        <BookingProcessCardContainer key={_id} step={step} title={title} />
      ))}
      <div className="w-1/3 self-center">
        <DynamicButton>Book your pet's journey now</DynamicButton>
      </div>
    </div>
  );
};
export default BookingProcessContent;
