"use client";

import { ConvexReactClient } from "convex/react";
import { FC, PropsWithChildren } from "react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>;
};

export default ConvexClientProvider;
