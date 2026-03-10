import { FC, useState } from "react";
import BookingProcessCardContainer from "../containers/BookingProcessCardContainer";
import DynamicButton from "../elements/button/DynamicButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "../elements/loader/Loader";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";

const BookingProcessContent: FC = () => {
  const bookingProcess = useQuery(api.tables.booking_process.get);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const mobile = useIsMobile();

  if (bookingProcess === undefined) {
    return <Loader />;
  }

  if (mobile) {
    return (
      <div className="flex w-full flex-col">
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
    );
  }

  return (
    <div className="flex w-full gap-0 min-h-[300px]">
      {bookingProcess?.map(({ _id, step, title, description, icon }) => (
        <BookingProcessCardContainer
          key={_id}
          step={step}
          title={title}
          description={description}
          image={icon}
          isExpanded={expandedStep === step}
          onToggle={() => setExpandedStep(expandedStep === step ? null : step)}
        />
      ))}
    </div>
  );
};
export default BookingProcessContent;
