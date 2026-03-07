"use client";

import { FC, PropsWithChildren } from "react";
import ConvexClientProvider from "./ConvexClientProvider";
import LoaderProvider from "@/utils/providers/LoaderProvider";
import ModalProvider from "./ModalProvider";
import AuthUserProvider from "./AuthUserProvider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConvexClientProvider>
      <AuthUserProvider>
        <LoaderProvider>
          <ModalProvider>{children}</ModalProvider>
        </LoaderProvider>
      </AuthUserProvider>
    </ConvexClientProvider>
  );
};

export default Providers;
