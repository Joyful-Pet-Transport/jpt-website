import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import Providers from "@/components/providers/Providers";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Joyful Pet Transport",
  description: "GProject by Joyful Dev",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={`${poppinsFont.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
};

export default RootLayout;
