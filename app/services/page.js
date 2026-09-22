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

  const servicesList = [
    {
      icon: <FaCertificate className="text-secondary text-2xl" />,
      title: "Ceylon Sapphire Certification Beruwala",
      subtitle: "Sri Lanka's Signature Gemstone Certification",
      desc: "Comprehensive testing and certification for fine Ceylon sapphires. Our laboratory evaluates color hue and saturation (Royal Blue, Cornflower Blue, Padparadscha), clarity grade, cut proportions, and provides unheated vs heated verification trusted by international gem markets.",
      highlights: [
        "Unheated natural sapphire authentication",
        "Color grading: Cornflower Blue, Royal Blue, Vivid, Pastel",
        "Padparadscha sapphire authenticity reports",
        "Star sapphire asterism & symmetry analysis",
      ],
    },
    {
      icon: <FaFlask className="text-secondary text-2xl" />,
      title: "Gemstone Testing Beruwala",
      subtitle: "Comprehensive Physical & Optical Analysis",
      desc: "Our Beruwala gem testing facility utilizes calibrated refractometers, hydrostatic specific gravity balances, and spectroscopes to determine the precise physical constants and optical properties of loose and mounted gemstones.",
      highlights: [
        "Refractive Index (RI) & Birefringence testing",
        "Hydrostatic Specific Gravity (SG) measurement",
        "Polariscope & Dichroscope pleochroism checks",
        "Fluorescence reaction under LW and SW UV light",
      ],
    },
    {
      icon: <FaMicroscope className="text-secondary text-2xl" />,
      title: "Gem Treatment Detection Beruwala",
      subtitle: "Advanced Scientific Enhancement Identification",
      desc: "With modern gemstone enhancement techniques constantly evolving, Finest Gem Lab uses advanced microscopic and spectroscopic methods to detect treatments that affect market value.",
      highlights: [
        "Thermal enhancement / heat treatment detection",
        "Beryllium and titanium diffusion detection",
        "Clarity enhancement: Lead glass and epoxy resin filling",
        "Surface coating, dyeing, and irradiation identification",
      ],
    },
    {
      icon: <FaSearch className="text-secondary text-2xl" />,
      title: "Gem Origin Determination Sri Lanka",
      subtitle: "Geographical Provenance Verification",
      desc: "Origin significantly impacts gemstone rarity and investment value. FGL evaluates microscopic internal inclusions, growth patterns, and trace-element spectroscopic signatures to determine geographical origin.",
      highlights: [
        "Ceylon (Sri Lanka) provenance validation",
        "Distinguishing Ceylon vs Madagascar vs Burma sapphires",
        "Ruby origin: Burma, Mozambique, Madagascar, Sri Lanka",
        "Emerald origin: Colombia, Zambia, Brazil",
      ],
    },
    {
      icon: <FaGem className="text-secondary text-2xl" />,
      title: "Gem Identification Beruwala",
      subtitle: "Species & Variety Mineral Classification",
      desc: "Accurate determination of gemstone species and variety. We distinguish natural gemstones from synthetic counterparts (hydrothermal, flux, flame fusion) and optical simulants.",
      highlights: [
        "Natural vs synthetic gemstone discrimination",
        "Rare gemstone identification (Alexandrite, Taaffeite, Musgravite)",
        "Spinel, Garnet, Tourmaline, Chrysoberyl classification",
        "Definitive gemological certificate issuance",
      ],
    },
    {
      icon: <FaShieldAlt className="text-secondary text-2xl" />,
      title: "Customized Certification & Verification",
      subtitle: "Tamper-Proof Reports for Trade & Export",
      desc: "Whether you need a compact memo report or a full deluxe gemological certificate, FGL reports come embedded with anti-counterfeiting security features and instant online QR verification.",
      highlights: [
        "Deluxe hardcover and brief format reports",
        "Encrypted QR code for instant digital verification",
        "Recognized by gem merchants, jewelers, and auction houses",
        "Full photographic documentation with high-res macro images",
      ],
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
        {/* Hero Section */}
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Gemstone Certification & Testing Services Beruwala
            </h1>
            <p className="max-w-3xl mx-auto text-white/90 text-lg">
              Finest Gem Lab (FGL) provides world-class gemstone testing, Ceylon
              sapphire certification, treatment detection, and origin determination
              in China Fort, Beruwala, Sri Lanka.
            </p>
          </div>
        </section>

        {/* Breadcrumbs Component */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Services Detail Grid */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Scientific Gemological Services in Sri Lanka
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              Our laboratory in Beruwala is equipped with research-grade instruments
              and staffed by certified gemologists to provide objective,
              internationally accepted testing reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesList.map((service, index) => (
              <div
                key={index}
                className="premium-card p-8 border-t-4 border-secondary flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary">
                        {service.title}
                      </h3>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-accent/80 mb-6 text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start text-xs text-accent/80"
                      >
                        <FaCheck className="text-green-600 mr-2 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-accent/60">Available at Beruwala Lab</span>
                  <Link
                    href="/contact"
                    className="text-primary hover:text-secondary font-semibold"
                  >
                    Inquire Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Testing Standards & Equipment Callout */}
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12 mb-16 shadow-gold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Why Jewelers & Traders Choose FGL Beruwala
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Finest Gem Lab operates directly inside China Fort, Beruwala — the
                  epicenter of Sri Lanka&#39;s international gemstone trade. Gem
                  merchants, exporters, and overseas buyers rely on FGL for
                  foolproof origin determination, treatment detection, and
                  tamper-proof certificates.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="font-bold text-white mb-1">Fast Turnaround</p>
                    <p className="text-white/70">Same-day and 24h testing options</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="font-bold text-white mb-1">Global Standard</p>
                    <p className="text-white/70">Internationally recognized grading</p>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link
                  href="/contact"
                  className="btn-secondary-fill inline-block hover:scale-105"
                >
                  Submit Gemstones for Testing
                </Link>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-center mb-8">
              Frequently Asked Questions About Gem Testing
            </h2>
            <div className="space-y-4">
              <div className="premium-card p-6">
                <h3 className="font-heading font-bold text-primary mb-2">
                  Where can I get Ceylon sapphire certification in Beruwala?
                </h3>
                <p className="text-sm text-accent/80 leading-relaxed">
                  Finest Gem Lab (FGL) provides authoritative Ceylon sapphire
                  certification at our laboratory on China Fort Road, Beruwala. We
                  certify Royal Blue, Cornflower Blue, Padparadscha, and fancy
                  sapphires with definitive unheated status.
                </p>
              </div>
              <div className="premium-card p-6">
                <h3 className="font-heading font-bold text-primary mb-2">
                  What gemstone testing services does FGL offer in Beruwala?
                </h3>
                <p className="text-sm text-accent/80 leading-relaxed">
                  In Beruwala, FGL offers complete gemstone testing: species and
                  variety identification, refractive index, specific gravity,
                  microscopic inclusion analysis, spectroscopy, treatment
                  detection, and geographical origin determination.
                </p>
              </div>
              <div className="premium-card p-6">
                <h3 className="font-heading font-bold text-primary mb-2">
                  Can FGL detect heat treatment in Sri Lankan sapphires?
                </h3>
                <p className="text-sm text-accent/80 leading-relaxed">
                  Yes. FGL specializes in gem treatment detection in Beruwala,
                  accurately identifying traditional heat treatment, low-temperature
                  thermal enhancement, beryllium diffusion, fracture filling, and
                  synthetic corundum.
                </p>
              </div>
              <div className="premium-card p-6">
                <h3 className="font-heading font-bold text-primary mb-2">
                  How can I verify my FGL certificate?
                </h3>
                <p className="text-sm text-accent/80 leading-relaxed">
                  You can verify any FGL certificate instantly online at{" "}
                  <Link href="/verify" className="text-primary underline">
                    fgl.lk/verify
                  </Link>{" "}
                  by entering your report number or scanning the report&#39;s QR code.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
