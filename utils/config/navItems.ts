export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/AboutUs" },
  {
    label: "Our Services",
    path: "/OurServices",
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
  { label: "Testimonials", path: "/Testimonials" },
  { label: "FAQs", path: "/Faq" },
  { label: "Contact Us", path: "/ContactUs" },
];
