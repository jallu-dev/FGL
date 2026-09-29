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
    default:
      "Finest Gem Lab (FGL) | Gem Lab Sri Lanka | Gem Certification & Testing Beruwala",
    template: "%s | Finest Gem Lab (FGL)",
  },
  description:
    "Finest Gem Lab (FGL) is Sri Lanka's premier gemological laboratory located in China Fort, Beruwala. Expert gemstone certification, identification & testing for Ceylon sapphire, ruby, emerald. Trusted gem testing lab in Sri Lanka & near you.",
  keywords: [
    // Original Keywords
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

    // Brand-Focused New Keywords
    "Finest Gem Lab Sri Lanka",
    "FGL Gem Lab Sri Lanka",
    "FGL Finest Gem Lab",
    "Finest Gem Lab Beruwala",

    // Location-Focused New Keywords
    "Finest Gem Lab China Fort Beruwala",
    "FGL Beruwala",
    "Gem Lab Beruwala",
    "Gem Testing Lab Beruwala",
    "Gem Laboratory China Fort Beruwala",

    // Service-Focused New Keywords
    "Gemstone certification Beruwala",
    "Gemstone testing Beruwala",
    "Sapphire testing Beruwala",
    "Ceylon sapphire certification Beruwala",
    "Gem identification Beruwala",
    "Gem treatment detection Beruwala",
    "Gem origin determination Sri Lanka",

    // Sri Lankan Gem Labs Focused New Keywords
    "Finest Gemological Laboratory",
    "Finest Gemological Laboratory Sri Lanka",
    "Finest Gemological Laboratory Beruwala",
    "Gemological laboratory Beruwala",
    "Gemological laboratory",
    "Gem testing lab",
    "Gem testing lab Beruwala",
    "Gem testing lab Sri lanka",

    // Nearest Gem Lab Focused ("Near Me") New Keywords
    "Gem testing lab near me",
    "Gem lab near me",
    "Gem laboratory near me",
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
    siteName: "Finest Gem Lab (FGL) Sri Lanka",
    title: "Finest Gem Lab (FGL) | Leading Gem Lab in Sri Lanka & Beruwala",
    description:
      "Finest Gem Lab (FGL) in China Fort, Beruwala, Sri Lanka: Premier gemstone testing, Ceylon sapphire certification, treatment detection & origin determination.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Finest Gem Lab (FGL) | Leading Gemological Laboratory in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finest Gem Lab (FGL) | Leading Gem Lab in Sri Lanka & Beruwala",
    description:
      "Finest Gem Lab (FGL) in China Fort, Beruwala: Premier gemstone testing and Ceylon sapphire certification in Sri Lanka.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  name: "Finest Gem Lab",
  alternateName: [
    "FGL",
    "Finest Gemological Laboratory",
    "Finest Gemological Laboratory Sri Lanka",
    "Finest Gemological Laboratory Beruwala",
    "FGL Gem Lab Sri Lanka",
    "FGL Finest Gem Lab",
    "Finest Gem Lab Sri Lanka",
    "Finest Gem Lab Beruwala",
    "Finest Gem Lab China Fort Beruwala",
    "FGL Beruwala",
    "Gem Lab Beruwala",
  ],
  legalName: "Finest Gem Lab (Pvt) Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/images/fgl-logo.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "Finest Gem Lab (FGL) is the leading gemological laboratory in Sri Lanka, based in China Fort, Beruwala. Providing expert Ceylon sapphire certification, gemstone testing, treatment detection, and geographical origin determination.",
  slogan: "Sri Lanka's Premier Gemological Laboratory",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "64D/2F, China Fort Rd",
    addressLocality: "Beruwala",
    addressRegion: "Western Province",
    postalCode: "12070",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "6.4771813",
    longitude: "79.9874871",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "China Fort, Beruwala",
    },
    {
      "@type": "City",
      name: "Beruwala",
    },
    {
      "@type": "City",
      name: "Colombo",
    },
    {
      "@type": "City",
      name: "Ratnapura",
    },
    {
      "@type": "Country",
      name: "Sri Lanka",
    },
    {
      "@type": "Place",
      name: "Worldwide",
    },
  ],
  telephone: "+94763549226",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+94763549226",
    email: "info@fgl.lk",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English", "Sinhala", "Tamil"],
  },
  priceRange: "$$",
  currenciesAccepted: "LKR, USD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
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
          name: "Ceylon Sapphire Certification Beruwala",
          description:
            "Expert Ceylon blue sapphire, padparadscha, and yellow sapphire certification and testing in Beruwala, Sri Lanka.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gemstone Testing & Certification Sri Lanka",
          description:
            "Accredited gemstone testing, identification, and certification services by certified gemologists.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gem Treatment Detection Beruwala",
          description:
            "Advanced scientific detection of thermal enhancement (heat treatment), beryllium diffusion, glass filling, and irradiation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gem Origin Determination Sri Lanka",
          description:
            "Spectroscopic and inclusion analysis for geographical origin determination (Ceylon, Burma, Mozambique, Madagascar).",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gem Identification Beruwala",
          description:
            "Scientific mineral species and variety identification using advanced spectroscopy and refractometry.",
        },
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61572485684286",
    "https://www.instagram.com/finest_gem_lab",
    "https://www.linkedin.com/in/shahmi-rinsan-fga-b607a4249",
    "https://wa.me/message/PDH7DQJLSC7XD1",
  ],
  founder: {
    "@type": "Person",
    name: "Shahmi Rinsan",
    jobTitle: "Head Gemologist & Director",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Fellow of the Gemmological Association (FGA)",
        credentialCategory: "Professional Gemologist",
      },
    ],
    knowsAbout: [
      "Gemology",
      "Ceylon Sapphire Certification",
      "Gemstone Identification",
      "Heat Treatment Detection",
      "Corundum Spectroscopy",
      "Geographical Origin Determination",
    ],
    sameAs: "https://www.linkedin.com/in/shahmi-rinsan-fga-b607a4249",
  },
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
