import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flight Levels | Joe Mattison",
  description: "Flight instructor, aviation educator, and ATC systems specialist. Mock oral checkrides, flight instruction, and the ATC Trainer app.",
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
