"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import BodyText from "./text/BodyText";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-t-2xl mx-120 -mt-20 z-100">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <BodyText
              onPress={() => router.push(item.path!)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            >
              {item.label}
            </BodyText>
          ) : (
            <BodyText className="text-red-500">{item.label}</BodyText>
          )}
          {index < items.length - 1 && <span>/</span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
