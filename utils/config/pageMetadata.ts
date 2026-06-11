import type { Metadata } from "next";

const siteUrl = "https://www.joyfulpettransport.com";

export const pageMetadata = {
  home: {
    title: "Trusted Pet Relocation in the Philippines",
    description:
      "Safe and stress-free pet relocation in the Philippines. Vet coordination, permits, and flight arrangements to the US, Canada, EU, and more. Get a quote today!",
    alternates: { canonical: siteUrl },
  },

  ourServices: {
    title: "Our Pet Transport Services",
    description:
      "International and domestic pet relocation plus rabies serology testing. Door-to-door pet transport across the Philippines and worldwide.",
    alternates: { canonical: `${siteUrl}/our-services` },
  },

  internationalPetRelocation: {
    title: "International Pet Relocation Anywhere in the World",
    description:
      "Import and export pets to and from the Philippines. We handle permits, airline booking assistance, vet coordination, and airport assistance.",
    alternates: {
      canonical: `${siteUrl}/our-services/international-pet-relocation`,
    },
  },

  domesticPetRelocation: {
    title: "Domestic Pet Relocation Philippines",
    description:
      "Safe door-to-door pet transport anywhere in the Philippines by land, sea, or air. Pick-up, routing, and delivery done by us for you.",
    alternates: {
      canonical: `${siteUrl}/our-services/domestic-pet-relocation`,
    },
  },

  rabiesSerologyTest: {
    title: "Rabies Serology Test for Pets",
    description:
      "Rabies titer testing for pet export from the Philippines. Guidance, scheduling, and documentation support for international travel requirements.",
    alternates: {
      canonical: `${siteUrl}/our-services/rabies-serology-test`,
    },
  },

  aboutUs: {
    title: "About Joyful Pet Transport",
    description:
      "Meet Joyful Pet Transport — trusted pet relocation specialists in the Philippines, serving furparents locally and internationally. We treat your pets like our own.",
 
    alternates: { canonical: `${siteUrl}/about-us` },
  },

  faq: {
    title: "Pet Relocation FAQs",
    description:
      "Answers about pet transport requirements, timelines, costs, and travel documents for domestic and international relocation from the Philippines.",
    alternates: { canonical: `${siteUrl}/faq` },
  },

  testimonials: {
    title: "Client Testimonials for Joyful Pet Transport",
    description:
      "Read reviews from families who trusted Joyful Pet Transport with their pets' domestic and international journeys.",
    alternates: { canonical: `${siteUrl}/testimonials` },
  },

  contactUs: {
    title: "Contact Joyful Pet Transport",
    description:
      "Reach Joyful Pet Transport for pet relocation quotes and inquiries. Email, phone, and social channels available.",
    alternates: { canonical: `${siteUrl}/contact-us` },
  },

  // Booking forms — noindex in Step 3
  domesticPetRelocationForm: {
    title: "Get a Quote for Domestic Pet Relocation",
    description: "Book door-to-door domestic pet transport anywhere in the Philippines.",
    robots: { index: false, follow: false },
  },

  internationalPetRelocationForm: {
    title: "Get a Quote for International Pet Relocation",
    description: "Start your international pet import or export booking with Joyful Pet Transport.",
    robots: { index: false, follow: false },
  },

  rabiesSerologyTestForm: {
    title: "Get a Quote for Rabies Serology Test",
    description: "Schedule rabies titer testing for your pet's international travel requirements.",
    robots: { index: false, follow: false },
  },
} satisfies Record<string, Metadata>;