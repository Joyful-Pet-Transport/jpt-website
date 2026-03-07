"use client";

import { useContext } from "react";
import AuthContext from "../contexts/auth-context";

export function useGetCurrentUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useGetCurrentUser can only be used inside AuthUserProvider",
    );
  }

  return context;
}

