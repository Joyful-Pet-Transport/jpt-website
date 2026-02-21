"use client";

import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import BodyText from "../text/BodyText";

export interface DynamicModalProps {
  className?: string;
  childClass?: string;
  size?: "normal" | "medium" | "large" | "full";
  headerText?: string;
  visible?: boolean;
  onClose: () => void;
}

const DynamicModal: FC<PropsWithChildren<DynamicModalProps>> = (props) => {
  const sizeClasses = {
    normal: "w-md",
    medium: "w-lg",
    large: "w-2xl",
    full: "w-full",
  };

  if (!props.visible) {
    return null;
  }

  return (
    <div className="fixed z-100 flex justify-center items-center start-0 top-0 bg-slate-900/50 w-screen h-screen p-4 mx-auto">
      <div className={sizeClasses[props.size || "normal"]}>
        <div
          className={
            props.className || "bg-white rounded-3xl flex flex-col p-6"
          }
        >
          <div className="flex w-full justify-between items-center">
            <BodyText weight="semibold">{props.headerText}</BodyText>
            <button
              onClick={props.onClose}
              className="flex justify-end items-end"
            >
              <HiX className="text-xl" />
            </button>
          </div>
          <div className={props.childClass}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
