"use client";

import { Role } from "@/models/role";
import { createContext } from "react";

export interface AuthUser {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  roleId?: string;
  role?: Role | null;
  roleName?: string | null;
  roleSlug?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
