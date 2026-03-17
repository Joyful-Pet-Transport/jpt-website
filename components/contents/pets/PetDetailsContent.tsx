"use client";

import WhiteCard from "@/components/card/WhiteCard";
import BodyText from "@/components/elements/text/BodyText";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Image from "next/image";

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
      <WhiteCard className="p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="relative min-h-80 lg:min-h-full bg-blue-50">
            <Image
              src={pet.image}
              alt={pet.pet_name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <BodyText weight="bold" className="text-2xl text-[#17528A]">
                {pet.pet_name}
              </BodyText>
              <div className="rounded-full bg-blue-50 px-3 py-1 border border-blue-200">
                <BodyText size="xsmall" className="uppercase tracking-wide text-blue-700">
                  Registered {dayjs(pet._creationTime).format("MMM DD, YYYY")}
                </BodyText>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Info label="Breed" value={pet.breed} />
              <Info label="Sex" value={pet.sex} />
              <Info label="Birthday" value={pet.pet_birthday} />
              <Info label="Age" value={pet.pet_age} />
              <Info label="Weight" value={pet.pet_weight} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Info label="Medical Condition" value={pet.pet_condition || "-"} />
              <Info
                label="Special Instructions"
                value={pet.special_instructions || "-"}
              />
            </div>
          </div>
        </div>
      </WhiteCard>
    </DashboardHeading>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <BodyText size="xsmall" className="uppercase tracking-wide text-slate-500">
        {label}
      </BodyText>
      <BodyText size="small" className="text-slate-900 break-words">
        {value}
      </BodyText>
    </div>
  );
};

export default PetDetailsContent;
