import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import LoaderProvider from "@/utils/providers/LoaderProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joyful Pet Transport",
  description: "GProject by Joyful Dev",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <LoaderProvider>{children}</LoaderProvider>
      </body>
    </html>
  );
};

export default RootLayout;
