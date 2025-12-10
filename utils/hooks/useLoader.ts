"use client";

import { useContext } from "react";
import LoaderContext from "../contexts/loader-context";

export function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader can only be used inside LoaderProvider");
  }

  return context;
}
