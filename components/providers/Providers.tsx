"use client";

import { FC, PropsWithChildren } from "react";
import ConvexClientProvider from "./ConvexClientProvider";
import LoaderProvider from "@/utils/providers/LoaderProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConvexClientProvider>
      <LoaderProvider>{children}</LoaderProvider>
    </ConvexClientProvider>
  );
};

export default Providers;
