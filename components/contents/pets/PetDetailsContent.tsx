"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import PetDetailsCard from "@/components/contents/pets/PetDetailsCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type PetDetailsContentProps = {
  id: Id<"pet_details">;
};

const PetDetailsContent = ({ id }: PetDetailsContentProps) => {
  const pet = useQuery(api.tables.pet_details.getById, { id });

  if (pet === undefined) {
    return (
      <DashboardHeading title="Pet Details">
        <BodyText size="small">Loading pet details...</BodyText>
      </DashboardHeading>
    );
  }

  if (!pet) {
    return (
      <DashboardHeading title="Pet Details" back="/dashboard/pets">
        <BodyText size="small">Pet not found.</BodyText>
      </DashboardHeading>
    );
  }

  return (
    <DashboardHeading title={pet.pet_name} back="/dashboard/pets">
      <WhiteCard className="overflow-hidden p-0">
        <PetDetailsCard pet={pet} />
      </WhiteCard>
    </DashboardHeading>
  );
};

export default PetDetailsContent;
