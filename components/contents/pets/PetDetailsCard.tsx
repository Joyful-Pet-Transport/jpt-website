"use client";

import BodyText from "@/components/elements/text/BodyText";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export type PetDetailDisplay = {
  pet_name: string;
  image: string;
  breed: string;
  sex: string;
  pet_birthday: string;
  pet_age: string;
  pet_weight: string;
  pet_condition?: string;
  special_instructions?: string;
  _creationTime: number;
};

type PetDetailsCardProps = {
  pet: PetDetailDisplay;
};

const PetDetailsCard = ({ pet }: PetDetailsCardProps) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!isImageOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImageOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageOpen]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
        <div className="flex justify-center p-4 lg:p-6">
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            className="group relative cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label={`View full photo of ${pet.pet_name}`}
          >
            <img
              src={pet.image}
              alt={pet.pet_name}
              className="block h-auto max-h-128 max-w-xl object-contain"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg bg-black/45 px-3 py-2 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              Click to view full photo
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BodyText weight="bold" className="text-2xl text-[#17528A]">
              {pet.pet_name}
            </BodyText>
            <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
              <BodyText
                size="xsmall"
                className="uppercase tracking-wide text-blue-700"
              >
                Registered {dayjs(pet._creationTime).format("MMM DD, YYYY")}
              </BodyText>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info label="Breed" value={pet.breed} />
            <Info
              label="Sex"
              value={
                pet.sex
                  ? pet.sex
                      .split("_")
                      .map(
                        (part) =>
                          part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
                      )
                      .join(" ")
                  : "-"
              }
            />
      
            <Info
              label="Birthday"
              value={
                pet.pet_birthday
                  ? dayjs(pet.pet_birthday).format("MMMM D, YYYY")
                  : "-"
              }
            />
      
            <Info
              label="Age"
              value={
                pet.pet_age
                  ? (() => {
                      const parts = pet.pet_age.split(" ");
                      let years = "";
                      let months = "";

                      parts.forEach((part) => {
                        if (part.endsWith("y")) {
                          const num = part.replace("y", "");
                          if (num !== "0") {
                            years = `${num} year${num === "1" ? "" : "s"}`;
                          }
                        } else if (part.endsWith("m")) {
                          const num = part.replace("m", "");
                          if (num !== "0") {
                            months = `${num} month${num === "1" ? "" : "s"}`;
                          }
                        }
                      });

                      const segments = [];
                      if (years) segments.push(years);
                      if (months) segments.push(months);

                      return segments.length > 0 ? segments.join(" & ") : "-";
                    })()
                  : "-"
              }
            />
      
            <Info
              label="Weight"
              value={
                pet.pet_weight
                  ? `${pet.pet_weight} kg`
                  : "-"
              }
            />
      
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

      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            aria-label="Close full photo view"
          >
            <IoClose size={24} />
          </button>

          <img
            src={pet.image}
            alt={pet.pet_name}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <BodyText
        size="xsmall"
        className="uppercase tracking-wide text-slate-500"
      >
        {label}
      </BodyText>
      <BodyText size="small" className="break-normal text-slate-900">
        {value}
      </BodyText>
    </div>
  );
};

export default PetDetailsCard;
