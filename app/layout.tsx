import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FredFrame - Add Actual Life Filters To Images",
  description:
    "Wondered how Fred Again makes those Actual Life Filters? Look no further! Turn your photos into an actual life cover.",
  keywords:
    "fred again, actual life, actual life generator, actual life filters, fred again actual life filter maker, Actual Life Filter Maker, fred again actual life generator, fred, fredagain",
  openGraph: {
    title: "FredFrame - Add Actual Life Filters To Images",
    description:
      "Wondered how Fred Again makes those Actual Life Filters? Look no further! Turn your photos into an actual life cover.",
    images: [
      {
        url: "/fred-thumb.png",
        width: 1200,
        height: 630,
        alt: "Thumbnail image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FredFrame - Add Actual Life Filters To Images",
    description:
      "Wondered how Fred Again makes those Actual Life Filters? Look no further! Turn your photos into an actual life cover.",
    images: ["/fred-thumb.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
