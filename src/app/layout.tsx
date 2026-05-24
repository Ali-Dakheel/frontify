import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const diatype = localFont({
  variable: "--font-diatype",
  display: "swap",
  src: [
    { path: "../../public/fonts/abcdiatype-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/abcdiatype-regularitalic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/abcdiatype-medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/abcdiatype-mediumitalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/abcdiatype-bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/abcdiatype-bolditalic.woff2", weight: "700", style: "italic" },
    { path: "../../public/fonts/abcdiatype-black.woff2", weight: "900", style: "normal" },
    { path: "../../public/fonts/abcdiatype-blackitalic.woff2", weight: "900", style: "italic" },
  ],
});

const cranny = localFont({
  variable: "--font-cranny",
  display: "swap",
  src: [
    { path: "../../public/fonts/cranny-light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/cranny-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/cranny-medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/cranny-bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/cranny-black.woff2", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Frontify: Where Brands Live - Brand Management Software",
  description:
    "Bring your brand to life with the platform that unites resources and intelligent workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${diatype.variable} ${cranny.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
