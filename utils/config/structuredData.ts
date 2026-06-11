const siteUrl = "https://www.joyfulpettransport.com";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Site-wide business schema — used on every page */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Joyful Pet Transport",
  legalName: "Joyful International Pet Transport Corp.",
  description:
    "Safe and stress-free domestic and international pet relocation in the Philippines. Vet coordination, permits, and flight arrangements.",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  image: `${siteUrl}/favicon.ico`,
  email: "reservations@joyfulpettransport.com",
  telephone: "+63 956 810 1871",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH",
    addressLocality: "Dasmariñas",
    addressRegion: "Cavite",
    postalCode: "4114",
    streetAddress: "Block 10 Lot 7 Woodpecker St. Avida Residences Salawag",
  },
  areaServed: [
    { "@type": "Country", name: "Philippines" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: [
    "https://www.facebook.com/joyfulpettransport",
    "https://www.instagram.com/joyfulpettransport",
    "https://www.tiktok.com/@joyfulpettransport",
    "https://www.youtube.com/channel/UCxF1iwT7pyEHydsYOpuo6_g",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+63 956 810 1871",
    contactType: "Customer Service",
    email: "reservations@joyfulpettransport.com",
    availableLanguage: ["English", "Filipino"],
  },
};

/** FAQ schema — built from live Convex FAQ data */
export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}