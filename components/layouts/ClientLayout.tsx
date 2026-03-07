"use client";

import Providers from "@/utils/providers/Providers";
import { FC, PropsWithChildren } from "react";

const ClientLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Providers>{children}</Providers>;
};

export default ClientLayout;
