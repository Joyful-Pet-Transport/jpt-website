export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  {
    label: "Our Services",
    path: "/our-services",
    children: [
      {
        label: "International Pet Relocation",
        path: "/international-pet-relocation",
      },
      {
        label: "Domestic Pet Relocation",
        path: "/domestic-pet-relocation",
      },
      {
        label: "Rabies Serology Test",
        path: "/rabies-serology-test",
      },
    ],
  },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQs", path: "/faq" },
  { label: "Contact Us", path: "/contact-us" },
];
