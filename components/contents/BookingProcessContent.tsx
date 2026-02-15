import { FC, useState } from "react";
import BookingProcessCardContainer from "../containers/BookingProcessCardContainer";
import DynamicButton from "../elements/button/DynamicButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "../elements/loader/Loader";

const BookingProcessContent: FC = () => {
  const bookingProcess = useQuery(api.tables.booking_process.get);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  if (bookingProcess === undefined) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col gap-40">
      <div className="flex gap-0 h-[300px]">
        {bookingProcess?.map(({ _id, step, title, description, icon }) => (
          <BookingProcessCardContainer
            key={_id}
            step={step}
            title={title}
            description={description}
            image={icon}
            isExpanded={expandedStep === step}
            onToggle={() =>
              setExpandedStep(expandedStep === step ? null : step)
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <DynamicButton className="w-full">
          Book your pet's journey now
        </DynamicButton>
      </div>
    </div>
  );
};
export default BookingProcessContent;
