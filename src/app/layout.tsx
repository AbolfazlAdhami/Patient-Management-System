import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "پزشک آنلاین",
  description:
    "Online doctor is a term that emerged during the 2000s, used by both the media and academics, to describe a generation of physicians and health practitioners who deliver healthcare, including drug prescription, over the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
