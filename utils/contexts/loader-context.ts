"use client";

import { createContext } from "react";

export interface LoaderContextType {
  loading: boolean;
  toggleLoader: () => void;
  setLoading: (loading: boolean) => void;
  backgroundComponent?: React.ReactNode;
  setBackgroundComponent: (component: React.ReactNode | null) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export default LoaderContext;
