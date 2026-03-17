"use client";

import BookingDetailsContent from "@/components/contents/bookings/BookingDetailsContent";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const BookingDetailsPage = () => {
  const params = useParams<{ id: string }>();

  return <BookingDetailsContent id={params.id as Id<"bookings">} />;
};

export default BookingDetailsPage;
