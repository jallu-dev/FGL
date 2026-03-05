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
    default: "FGL - Finest Gem Lab | Gem Certification Sri Lanka | Gem Lab Sri Lanka",
    template: "%s | FGL - Finest Gem Lab",
  },
  description:
    "FGL (Finest Gem Lab) - Sri Lanka's leading gem lab. Expert gemstone certification, identification & testing. Trusted gem laboratory in Sri Lanka for ruby, sapphire, emerald certification.",
  keywords: [
    "FGL",
    "FGL gem lab",
    "Finest Gem Lab",
    "gem lab sri lanka",
    "gem lab in sri lanka",
    "gemological laboratory sri lanka",
    "gem certification sri lanka",
    "gemstone lab sri lanka",
    "sri lanka gem testing",
    "gem identification sri lanka",
    "gemstone certification sri lanka",
    "FGL sri lanka",
    "gem laboratory sri lanka",
    "gemstone testing sri lanka",
    "ruby certification sri lanka",
    "sapphire certification sri lanka",
    "emerald certification sri lanka",
    "gem origin determination",
    "treatment detection",
    "sri lankan gem lab",
    "colombo gem lab",
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
    siteName: "FGL - Finest Gem Lab Sri Lanka",
    title: "FGL - Finest Gem Lab | Leading Gem Lab in Sri Lanka",
    description:
      "FGL is Sri Lanka's premier gem laboratory. Expert gemstone certification, identification & testing. Leading gem lab in Sri Lanka trusted worldwide.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "FGL - Finest Gem Lab | Leading Gemological Laboratory in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FGL - Finest Gem Lab | Leading Gem Lab in Sri Lanka",
    description:
      "FGL gem lab Sri Lanka: Expert gemstone certification, identification & testing. Sri Lanka's trusted gem laboratory.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  name: "Finest Gem Lab",
  alternateName: ["FGL", "FGL Gem Lab", "FGL Sri Lanka"],
  legalName: "Finest Gem Lab (Pvt) Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/images/fgl-logo.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "FGL (Finest Gem Lab) is the leading gemological laboratory in Sri Lanka, providing expert gem identification, certification, treatment detection, and geographical origin determination. Premier gem lab in Sri Lanka trusted worldwide.",
  slogan: "Sri Lanka's Premier Gem Laboratory",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressRegion: "Western Province",
    addressCountry: "LK",
    streetAddress: "Sri Lanka",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "6.9271",
    longitude: "79.8612",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Sri Lanka",
    },
    {
      "@type": "Place",
      name: "Worldwide",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@fgl.lk",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English", "Sinhala"],
  },
  priceRange: "$$",
  currenciesAccepted: "LKR, USD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Gemological Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gem Certification Sri Lanka",
          description: "Professional gem certification services in Sri Lanka",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gemstone Testing & Identification",
          description: "Advanced gemstone testing and identification services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Origin Determination",
          description: "Geographical origin determination for gemstones",
        },
      },
    ],
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
