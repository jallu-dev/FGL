import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Finest Gem Lab (FGL)",
  description: "Expert gemological analysis and certification services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Suspense>
          <ReactQueryProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <ReactQueryDevtools />
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
