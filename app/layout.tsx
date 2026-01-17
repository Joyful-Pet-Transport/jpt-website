import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import LoaderProvider from "@/utils/providers/LoaderProvider";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

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
    <html lang="en">
      <body className={`${outfitFont.className} antialiased`}>
        <ConvexClientProvider>
          <LoaderProvider>{children}</LoaderProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
