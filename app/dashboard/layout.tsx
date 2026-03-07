"use client";

import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import { useAuthToken } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthToken();
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    console.log("Current user:", user);
    if (user?.role?.slug !== "staff" && user?.role?.slug !== "admin") {
      router.replace("/");
    }
  }, []);

  return <>{children}</>;
};

export default DashboardLayout;
