"use client";

import PetDetailsContent from "@/components/contents/pets/PetDetailsContent";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const PetDetailsPage = () => {
  const params = useParams<{ id: string }>();

  return <PetDetailsContent id={params.id as Id<"pet_details">} />;
};

export default PetDetailsPage;
