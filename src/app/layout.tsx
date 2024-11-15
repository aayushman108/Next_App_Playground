import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import { ThemeProvider } from "@/components/themeProvider/themeProvider.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next app playground",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  hero,
  tabGroup,
  tabGroupTwo,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
  tabGroup: React.ReactNode;
  tabGroupTwo: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <>
            {children}
            {hero}
            {tabGroup}
            {tabGroupTwo}
          </>
        </ThemeProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
