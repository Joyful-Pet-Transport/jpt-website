"use client";

import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { FC, useEffect } from "react";
import BodyText from "../elements/text/BodyText";
import { useGetCurrentUser } from "@/utils/hooks/useGetCurrentUser";
import { useRouter } from "next/navigation";

const AuthButton: FC = () => {
  const { signIn, signOut } = useAuthActions();
  const token = useAuthToken();
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();

  if (!token) {
    return (
      <BodyText
        size="small"
        onPress={() => void signIn("google")}
        textColor="text-neutral-600"
      >
        Login
      </BodyText>
    );
  }

  return (
    <div className="flex gap-2">
      <BodyText
        size="small"
        onPress={() => void signOut()}
        textColor="text-neutral-600"
      >
        Logout
      </BodyText>
      {["customer", "admin"].includes(user?.role?.slug ?? "") && (
        <BodyText
          size="small"
          onPress={() => router.push("/dashboard")}
          textColor="text-neutral-600"
        >
          | Dashboard
        </BodyText>
      )}
    </div>
  );
};
export default AuthButton;
