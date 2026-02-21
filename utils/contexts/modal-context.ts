import { createContext, ReactNode } from "react";

export interface ModalOptions {
  size: "normal" | "medium" | "large" | "full";
  headerText?: string;
  className?: string;
  childClass?: string;
}

export interface ModalContextType {
  shown: boolean;
  component: ReactNode;
  modalOptions: ModalOptions;
  setShown: (shown: boolean) => void;
  setModalComponent: (
    component: ReactNode,
    size: "normal" | "medium" | "large" | "full",
    className?: string,
    childClass?: string,
  ) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default ModalContext;
