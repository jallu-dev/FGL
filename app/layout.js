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

const SITE_URL = "https://fgl.lk";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Finest Gem Lab (FGL) | Expert Gem Certification in Sri Lanka",
    template: "%s | Finest Gem Lab (FGL)",
  },
  description:
    "Finest Gem Lab (FGL) is Sri Lanka's trusted gemological laboratory offering expert gem identification, certification, treatment detection, and origin determination using advanced scientific methods.",
  keywords: [
    "gem certification Sri Lanka",
    "gemological laboratory",
    "gem identification",
    "gemstone certification",
    "FGL",
    "Finest Gem Lab",
    "gemstone report",
    "gem testing",
    "ruby certification",
    "sapphire certification",
    "emerald certification",
    "origin determination",
    "treatment detection",
    "gem lab Sri Lanka",
  ],
  authors: [{ name: "Finest Gem Lab", url: SITE_URL }],
  creator: "Finest Gem Lab (FGL)",
  publisher: "Finest Gem Lab (FGL)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Finest Gem Lab (FGL)",
    title: "Finest Gem Lab (FGL) | Expert Gem Certification in Sri Lanka",
    description:
      "Sri Lanka's trusted gemological laboratory — expert gem identification, certification, treatment detection, and origin determination backed by advanced scientific analysis.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Finest Gem Lab — Gemological Laboratory Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finest Gem Lab (FGL) | Expert Gem Certification in Sri Lanka",
    description:
      "Sri Lanka's trusted gemological laboratory — expert gem identification, certification, treatment detection, and origin determination.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Finest Gem Lab",
  alternateName: "FGL",
  url: SITE_URL,
  logo: `${SITE_URL}/images/fgl-logo.png`,
  description:
    "Finest Gem Lab (FGL) is a leading gemological laboratory in Sri Lanka providing expert gem identification, certification, treatment detection, and geographical origin determination.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@fgl.lk",
    url: `${SITE_URL}/contact`,
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Finest Gem Lab (FGL)",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/verify?id={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
