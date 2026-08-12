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
  title: "Mohan Sai Pujari | Backend Engineer",
  description:
    "Backend Engineer with 4+ years building scalable distributed systems with Java, Go, Scala, and Python. Checkout platforms, IoT pipelines, and warehouse management at scale.",
  keywords: [
    "Mohan Sai Pujari",
    "Backend Engineer",
    "Java",
    "Go",
    "Scala",
    "Distributed Systems",
    "Microservices",
    "Kafka",
  ],
  authors: [{ name: "Mohan Sai Pujari" }],
  openGraph: {
    title: "Mohan Sai Pujari | Backend Engineer",
    description:
      "Building scalable backend systems — Java, Go, Scala, Python, Kafka, and cloud-native architecture.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
