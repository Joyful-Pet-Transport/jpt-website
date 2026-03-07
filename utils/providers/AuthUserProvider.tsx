"use client";

import { FC, PropsWithChildren } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthContext from "../contexts/auth-context";

const AuthUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const currentUser = useQuery(api.tables.users.current);

  const isLoading = currentUser === undefined;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser ?? null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthUserProvider;
