import { Role } from "./role";

export interface User {
  _id: string;
  email: string;
  emailVerificationTime?: string;
  image?: string;
  isAnonymous?: boolean;
  name: string;
  phone?: string;
  roleId?: string;
  role?: Role;
}
