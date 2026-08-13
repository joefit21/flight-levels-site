import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.flight-levels.com"),
  title: {
    default: "Flight Levels | Joe Mattison, CFI and Mountain Flying Instructor · Longmont, CO",
    template: "%s | Flight Levels",
  },
  description:
    "Certificated flight instructor and former Denver ARTCC controller based at KLMO, Longmont, Colorado. Mountain flying instruction, flight reviews, IPCs, destination pilot orientation for visiting pilots, and AI-powered aviation training tools.",
  keywords: [
    "mountain flying instructor Colorado",
    "CFI Longmont Colorado",
    "KLMO flight instructor",
    "Colorado mountain flying instruction",
    "destination pilot Colorado",
    "flying into Colorado",
    "flight review Longmont CO",
    "instrument proficiency check Colorado",
    "Denver ARTCC airspace",
    "Rocky Mountain flying",
    "flight instructor Front Range",
    "checkride prep",
    "mock oral checkride",
    "ATC trainer app",
    "aviation training Colorado",
    "CFI CFII",
    "private pilot instruction",
    "instrument rating instruction",
    "commercial pilot training",
    "Joe Mattison",
    "Flight Levels",
  ],
  authors: [{ name: "Joe Mattison" }],
  creator: "Joe Mattison",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flight Levels | Joe Mattison, CFI and Mountain Flying Instructor · Longmont, CO",
    description:
      "Certificated flight instructor and former Denver ARTCC controller based at KLMO, Longmont, Colorado. Mountain flying, flight reviews, IPCs, and destination pilot orientation.",
    url: "https://www.flight-levels.com",
    siteName: "Flight Levels",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Joe Mattison, CFI and Mountain Flying Instructor, Longmont Colorado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Levels | Joe Mattison, CFI and Mountain Flying Instructor · Longmont, CO",
    description:
      "Certificated flight instructor and former Denver ARTCC controller based at KLMO, Longmont, Colorado. Mountain flying, flight reviews, IPCs, and destination pilot orientation.",
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4H1SCW6EWY" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4H1SCW6EWY');
        `}} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
