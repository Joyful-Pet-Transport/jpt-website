"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import BodyText from "../text/BodyText";

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
    <div
      style={{
        clipPath:
          "path('M0 64 L34 64 A16 16 0 0 0 50 48 L50 16 A16 16 0 0 1 66 0 L534 0 A16 16 0 0 1 550 16 L550 48 A16 16 0 0 0 566 64 L600 64 Z')",
        WebkitClipPath:
          "path('M0 64 L34 64 A16 16 0 0 0 50 48 L50 16 A16 16 0 0 1 66 0 L534 0 A16 16 0 0 1 550 16 L550 48 A16 16 0 0 0 566 64 L600 64 Z')",
      }}
      className="z-100 h-16 w-[600px] flex self-center justify-center py-4 bg-white -mt-24"
    >
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 pt-2">
          {item.path ? (
            <BodyText
              font="fredoka"
              weight="semibold"
              size="medium"
              onPress={() => router.push(item.path!)}
              className="cursor-pointer hover:opacity-70 transition-opacity capitalize"
            >
              {item.label}
            </BodyText>
          ) : (
            <BodyText
              font="fredoka"
              weight="semibold"
              size="medium"
              textColor="text-[#F8721F]"
              className="capitalize"
            >
              {item.label}
            </BodyText>
          )}
          {index < items.length - 1 && (
            <BodyText font="fredoka" weight="semibold" size="medium">
              /
            </BodyText>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
