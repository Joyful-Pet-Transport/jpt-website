"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { isDashboardAuthBypassEnabled } from "@/utils/config/devAuth";
import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import { useAuthToken } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const DashboardLayoutScreen: FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthToken();
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isDashboardAuthBypassEnabled) {
      return;
    }

    if (isLoading) return;
    if (!user || !token) {
      router.replace("/");
      return;
    }
    console.log("Current user:", user);
    if (user?.role?.slug !== "staff" && user?.role?.slug !== "admin") {
      router.replace("/");
    }
  }, [user, isLoading, token ?? null, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutScreen;
