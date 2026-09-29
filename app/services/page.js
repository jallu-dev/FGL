import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import {
  FaGem,
  FaCertificate,
  FaMicroscope,
  FaSearch,
  FaShieldAlt,
  FaCheck,
  FaFlask,
} from "react-icons/fa";

export const metadata = {
  title:
    "FGL Services | Gemstone Certification & Testing Beruwala Sri Lanka | Ceylon Sapphire Testing",
  description:
    "FGL gem lab Sri Lanka offers expert gemological services in China Fort, Beruwala: Ceylon sapphire certification, gem identification, treatment detection & origin determination. Sri Lanka's premier gem testing laboratory.",
  alternates: { canonical: "https://fgl.lk/services" },
  openGraph: {
    title:
      "FGL Gemological Services | Gemstone Certification & Testing Beruwala Sri Lanka",
    description:
      "Complete gemological services from FGL - Sri Lanka's leading gem laboratory in Beruwala: Ceylon sapphire certification, gem identification, treatment detection & origin determination.",
    url: "https://fgl.lk/services",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finest Gem Lab Gemstone Certification & Testing Services Beruwala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FGL Services | Gemstone Certification & Testing Beruwala | Finest Gem Lab",
    description:
      "Premier Ceylon sapphire certification and gemstone testing in Beruwala, Sri Lanka by Finest Gem Lab (FGL).",
    images: ["/images/og-image.jpg"],
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FGL Gemological Services - Gem Lab Sri Lanka & Beruwala",
  description:
    "Expert gemological services offered by FGL (Finest Gem Lab) - Sri Lanka's premier gem laboratory in China Fort, Beruwala",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Ceylon Sapphire Certification Beruwala",
        description:
          "Comprehensive grading and certification for natural Ceylon sapphires including Cornflower blue, Royal blue, Padparadscha, and yellow sapphires.",
        provider: {
          "@type": "Organization",
          name: "Finest Gem Lab",
          alternateName: "FGL",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Gemstone Testing Beruwala",
        description:
          "High-precision testing to determine physical, optical, and chemical properties of precious and semi-precious gemstones.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Gem Identification Beruwala & Sri Lanka",
        description:
          "Scientific analysis to accurately identify gemstone species and varieties using advanced spectroscopy and microscopy.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Gem Treatment Detection Beruwala",
        description:
          "Advanced testing to determine if a gemstone has undergone any enhancements or treatments such as heat treatment, beryllium diffusion, filling, or coating.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Gem Origin Determination Sri Lanka",
        description:
          "Evaluating the geographical origins of gemstones based on inclusions, trace elements, and spectroscopic data (Ceylon, Burma, Mozambique).",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "Customized Gem Certification",
        description:
          "Tailored gemstone certificates based on individual and trade requirements, meeting international gemological standards with QR verification.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What gemological services does FGL gem lab Sri Lanka offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL (Finest Gem Lab) in Sri Lanka offers comprehensive gem identification, Ceylon sapphire certification, treatment detection, geographical origin determination, and customized gem certification using advanced scientific methods.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get Ceylon sapphire certification in Beruwala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finest Gem Lab (FGL) provides authoritative Ceylon sapphire certification at our laboratory on China Fort Road, Beruwala. We certify Royal Blue, Cornflower Blue, Padparadscha, and fancy sapphires, providing definitive natural unheated vs heated status.",
      },
    },
    {
      "@type": "Question",
      name: "What gemstone testing services does FGL offer in Beruwala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Beruwala, FGL offers complete gemstone testing: species and variety identification, refractive index, specific gravity, microscopic inclusion analysis, spectroscopy (UV-Vis-NIR/FTIR), treatment detection, and origin determination.",
      },
    },
    {
      "@type": "Question",
      name: "How does FGL identify gemstones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL uses advanced spectroscopy, microscopy, and trace element analysis to accurately identify gemstone species and varieties.",
      },
    },
    {
      "@type": "Question",
      name: "Can FGL detect gemstone treatments and heat enhancements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FGL uses advanced testing methods to detect heat treatment, low-temperature heating, beryllium diffusion, fracture filling, coating, and other enhancements commonly applied to gemstones.",
      },
    },
    {
      "@type": "Question",
      name: "Does FGL provide geographical origin reports for gems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FGL evaluates the geographical origin of gemstones based on inclusions, trace elements, and spectroscopic signatures, issuing origin determination reports for Ceylon, Burma, Mozambique, and other sources.",
      },
    },
    {
      "@type": "Question",
      name: "How long does gem testing and certification take at FGL Beruwala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard gemstone certification typically takes between 1 to 2 working days. Express same-day testing services are also available in our China Fort Beruwala laboratory for active gem dealers and exporters.",
      },
    },
  ],
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: null },
  ];

  const services = [
    {
      title: "Gem Identification",
      desc: "Scientific analysis to accurately identify gemstone species and varieties.",
    },
    {
      title: "Treatment Detection",
      desc: "Advanced testing to determine if a gem has undergone any treatments.",
    },
    {
      title: "Origin Determination",
      desc: "Evaluating geological origins of gems based on inclusions and trace elements.",
    },
    {
      title: "Customized Certification",
      desc: "Tailored certificates based on your individual and trade requirements.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            FGL Gemological Services
          </h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Comprehensive gemological services from Sri Lanka&apos;s premier gem
            laboratory, backed by cutting-edge technology and international
            standards.
          </p>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        <section className="py-16 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="premium-card p-6 border-l-4 border-secondary"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-accent">{service.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
