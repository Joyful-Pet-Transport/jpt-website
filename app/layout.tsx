import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import Providers from "@/components/providers/Providers";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const outfitFont = Outfit({
  variable: "--font-outfit",
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
        <body className={`${outfitFont.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
};

export default RootLayout;
