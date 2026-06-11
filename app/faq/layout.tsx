import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import JsonLd from "@/components/layouts/JsonLd";
import { pageMetadata } from "@/utils/config/pageMetadata";
import { buildFaqPageJsonLd } from "@/utils/config/structuredData";

export const metadata: Metadata = pageMetadata.faq;

export default async function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const faqs = await convex.query(api.tables.frequently_asked_questions.get, {});

  return (
    <>
      <JsonLd data={buildFaqPageJsonLd(faqs)} />
      {children}
    </>
  );
}