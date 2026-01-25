"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { FC, PropsWithChildren, ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ConvexClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
