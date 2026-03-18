import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.flight-levels.com"),
  title: {
    default: "Flight Levels | Joe Mattison — CFI & Aviation Educator",
    template: "%s | Flight Levels",
  },
  description:
    "Flight instructor with 21 years of experience and former air traffic control specialist. Flight instruction, mock oral checkrides, and AI-powered aviation training tools.",
  keywords: [
    "flight instructor",
    "CFI",
    "mock oral checkride",
    "ATC trainer",
    "checkride prep",
    "aviation training",
    "IFR instruction",
    "private pilot",
    "instrument rating",
    "commercial pilot",
    "Joe Mattison",
  ],
  authors: [{ name: "Joe Mattison" }],
  creator: "Joe Mattison",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flight Levels | Joe Mattison — CFI & Aviation Educator",
    description:
      "Flight instructor with 21 years of experience and former ATC specialist. Flight instruction, mock oral checkrides, and AI-powered aviation training.",
    url: "https://www.flight-levels.com",
    siteName: "Flight Levels",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Levels | Joe Mattison — CFI & Aviation Educator",
    description:
      "Flight instructor with 21 years of experience and former ATC specialist. Flight instruction, mock oral checkrides, and AI-powered aviation training.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
