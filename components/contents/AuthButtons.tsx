"use client";

import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import DynamicButton from "../elements/button/DynamicButton";
import { FC } from "react";
import BodyText from "../elements/text/BodyText";

// subject to change very soon
export const SignInButton: FC = () => {
  const { signIn } = useAuthActions();
  const token = useAuthToken();

  if (token) {
    return null;
  }

  return (
    <BodyText weight="semibold" onPress={() => void signIn("google")}>
      Google
    </BodyText>
  );
};

export const SignOutButton: FC = () => {
  const { signOut } = useAuthActions();
  const token = useAuthToken();

  if (!token) {
    return null;
  }

  return (
    <BodyText weight="semibold" onPress={() => void signOut()}>
      Sign out
    </BodyText>
  );
};
