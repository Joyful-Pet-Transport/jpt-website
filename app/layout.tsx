import type { Metadata } from "next";
import {
  Poppins,
  Fredoka,
  Luckiest_Guy,
  League_Spartan,
} from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ClientLayout from "@/components/layouts/ClientLayout";
import GoogleAnalytics from "@/components/layouts/GoogleAnalytics";
import JsonLd from "@/components/layouts/JsonLd";
import { localBusinessJsonLd } from "@/utils/config/structuredData";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fredokaFont = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const luckiestGuyFont = Luckiest_Guy({
  variable: "--font-luckiest_guy",
  subsets: ["latin"],
  weight: "400",
});

const leagueSpartanFont = League_Spartan({
  variable: "--font-league_spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joyfulpettransport.com"),
  title: {
    default:
      "Joyful Pet Transport | Trusted Pet Relocation in the Philippines",
    template: "%s | Joyful Pet Transport",
  },
  description:
    "Safe and stress-free pet relocation in the Philippines. Vet coordination, permits, and flight arrangements to the US, Canada, EU, and more. Get a quote today!",
  alternates: {
    canonical: "https://www.joyfulpettransport.com",
  },
    openGraph: {
    siteName: "Joyful Pet Transport",
    locale: "en_PH",
    type: "website",
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${poppinsFont.className} antialiased`}
          style={
            {
              "--font-fredoka": fredokaFont.style.fontFamily,
              "--font-luckiest_guy": luckiestGuyFont.style.fontFamily,
              "--font-league_spartan": leagueSpartanFont.style.fontFamily,
            } as React.CSSProperties
          }
        >
          
          <GoogleAnalytics />
          <JsonLd data={localBusinessJsonLd} />
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
};

export default RootLayout;
