import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/redux/provider";
import { Inter, Poppins } from "next/font/google";
import { ListingProvider } from "./context/ListingContext";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
const helveticaWorld = localFont({
  src: "../../public/fonts/HelveticaWorld.woff2",
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${helveticaWorld.variable} font-serif`}
      >
        <Navbar />
        <ListingProvider>
          <Providers>{children}</Providers>
        </ListingProvider>
        <Footer />
      </body>
    </html>
  );
}
