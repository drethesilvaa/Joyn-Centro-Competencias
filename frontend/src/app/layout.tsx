import type { Metadata } from "next";
import { Karla, Lato } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Template } from "../layouts/Template";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Centro de Competências JOYN",
  description: "Centro de Competências JOYN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${lato.variable} antialiased`}>
        <Providers>
          <Template>
            {children}
          </Template>
        </Providers>
      </body>
    </html>
  );
}
