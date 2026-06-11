import type { Metadata } from "next";
import { pageMetadata } from "@/utils/config/pageMetadata";

export const metadata: Metadata = pageMetadata.domesticPetRelocationForm;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}