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
  title: "Joyful Pet Transport",
  description: "GProject by Joyful Dev",
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
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
};

export default RootLayout;
