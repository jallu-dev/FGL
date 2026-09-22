import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import {
  FaCheckCircle,
  FaMicroscope,
  FaShieldAlt,
  FaAward,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const metadata = {
  title:
    "About FGL | Leading Gem Lab in Sri Lanka | Finest Gemological Laboratory Beruwala",
  description:
    "About FGL (Finest Gem Lab) - Sri Lanka's premier gem laboratory in China Fort, Beruwala. Certified gemologists, state-of-the-art equipment, and internationally trusted Ceylon gem certification. Leading gem lab Sri Lanka.",
  alternates: { canonical: "https://fgl.lk/about" },
  openGraph: {
    title:
      "About FGL - Finest Gem Lab | Sri Lanka's Premier Gemological Laboratory",
    description:
      "FGL is Sri Lanka's leading gem lab in China Fort, Beruwala with certified gemologists and advanced equipment. Internationally trusted for accurate gem certification and testing.",
    url: "https://fgl.lk/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Finest Gemological Laboratory Beruwala Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Finest Gemological Laboratory | FGL Beruwala Sri Lanka",
    description:
      "Finest Gemological Laboratory in China Fort, Beruwala: Accredited gemologists and state-of-the-art testing in Sri Lanka.",
    images: ["/images/og-image.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FGL (Finest Gem Lab) Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL (Finest Gem Lab / Finest Gemological Laboratory) is the premier gemological laboratory in Sri Lanka located on China Fort Road, Beruwala. Dedicated to providing accurate, unbiased, and professional gem identification, Ceylon sapphire certification, treatment detection, and geographical origin analysis.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose FGL gem lab in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL is Sri Lanka's top gem laboratory, located in China Fort, Beruwala. Equipped with state-of-the-art spectrometers and microscopes, employing internationally certified gemologists, and trusted worldwide by jewelers, collectors, and investors for secure, reliable gem certification.",
      },
    },
    {
      "@type": "Question",
      name: "Where is FGL Gemological Laboratory located in Beruwala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL is located at 64D/2F, China Fort Rd, Beruwala (12070), Sri Lanka, in the historical China Fort gem trading market. We offer walk-in gem testing services for local dealers, jewelers, and international gemstone buyers.",
      },
    },
    {
      "@type": "Question",
      name: "What scientific equipment does Finest Gem Lab utilize?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL utilizes advanced gemological equipment including UV-Vis-NIR spectrometers, FTIR spectroscopy for treatment detection, high-resolution darkfield and immersion microscopes, refractometers, polariscopes, and hydrostatic specific gravity balances.",
      },
    },
    {
      "@type": "Question",
      name: "Is FGL internationally recognised?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Finest Gem Lab (FGL) is trusted worldwide for its scientifically accurate gem reports and internationally recognised standards (CIBJO terminology) in gemological analysis and certification. Reports can be verified instantly online at fgl.lk/verify.",
      },
    },
  ],
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About FGL", href: null },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        {/* Hero Section */}
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              About Finest Gemological Laboratory (FGL)
            </h1>
            <p className="max-w-3xl mx-auto text-white/90 text-lg">
              Sri Lanka&#39;s premier gemological laboratory, operating from the
              heart of China Fort, Beruwala. Delivering scientific precision,
              certified gemological expertise, and uncompromising integrity.
            </p>
          </div>
        </section>

        {/* Breadcrumbs Component */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Heritage & Mission Section */}
        <section className="py-16 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-secondary font-semibold uppercase tracking-wider text-xs">
                Rooted in Sri Lankan Gem Heritage
              </span>
              <h2 className="text-3xl font-heading text-primary font-bold mt-2 mb-6">
                Finest Gem Lab in China Fort, Beruwala
              </h2>
              <p className="text-accent/80 leading-relaxed mb-4">
                China Fort, Beruwala has been the cornerstone of the international
                colored gemstone trade for over a millennium. As gem traders, lapidaries,
                and international jewelers gather here daily, the demand for fast,
                scientific, and unbiased gem certification is paramount.
              </p>
              <p className="text-accent/80 leading-relaxed mb-6">
                <strong>Finest Gemological Laboratory (FGL)</strong> was established to
                provide this vital bridge between Sri Lanka&#39;s rich gemological
                treasures and the global market&#39;s requirement for rigorous scientific
                verification. From renowned Ceylon blue sapphires and padparadschas to
                rare rubies and spinels, our laboratory delivers reports that are
                recognized and respected worldwide.
              </p>
              <div className="flex items-center gap-3 text-primary font-medium text-sm">
                <FaMapMarkerAlt className="text-secondary text-lg" />
                <span>64D/2F, China Fort Rd, Beruwala, Sri Lanka</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-gold">
              <Image
                src="/images/microscope.png"
                alt="Finest Gemological Laboratory microscope analysis in Beruwala Sri Lanka"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Core Values / Why Choose FGL */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Why Finest Gemological Laboratory Stands Out
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              Our commitment to accuracy, scientific honesty, and technological
              investment has established FGL as the premier gem testing lab in Sri
              Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="premium-card p-8 border-t-4 border-primary">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FaAward className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">
                Certified Gemologists
              </h3>
              <p className="text-accent/80 text-sm leading-relaxed">
                Staffed by internationally certified gemologists (including FGA
                credentials) with extensive experience in Asian, African, and Sri
                Lankan corundum analysis.
              </p>
            </div>

            <div className="premium-card p-8 border-t-4 border-secondary">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FaMicroscope className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">
                State-of-the-Art Equipment
              </h3>
              <p className="text-accent/80 text-sm leading-relaxed">
                Utilizing advanced spectroscopy (UV-Vis-NIR and FTIR), high-power
                polarized microscopy, and immersion cells to detect low-temperature
                heat treatments and trace elements.
              </p>
            </div>

            <div className="premium-card p-8 border-t-4 border-primary">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">
                Unbiased Independence
              </h3>
              <p className="text-accent/80 text-sm leading-relaxed">
                Finest Gem Lab operates as a strictly independent laboratory with no
                commercial interest in gemstone trading, guaranteeing 100% objective
                scientific certification.
              </p>
            </div>
          </div>

          {/* Laboratory Testing Standards Section */}
          <div className="bg-gray-100 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 text-center">
              Our Scientific Gem Testing Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-base">
                    Species & Variety Identification
                  </h4>
                  <p className="text-accent/70 text-sm">
                    Definitive verification of crystal structure, refractive index,
                    birefringence, and optical character.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-base">
                    Enhancement & Treatment Detection
                  </h4>
                  <p className="text-accent/70 text-sm">
                    Definitive identification of thermal enhancement, beryllium
                    diffusion, glass filling, and surface treatments.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-base">
                    Geographical Origin Assessment
                  </h4>
                  <p className="text-accent/70 text-sm">
                    Comparing microscopic inclusion suites and spectroscopic absorption
                    with verified reference samples from Sri Lanka, Burma, and Africa.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-base">
                    Digital QR Certificate Verification
                  </h4>
                  <p className="text-accent/70 text-sm">
                    Every issued report is stored in our secure database, verifiable
                    in seconds from anywhere in the world.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              Visit Our Gem Testing Lab in Beruwala
            </h3>
            <p className="text-accent/80 max-w-xl mx-auto mb-6 text-sm">
              Whether you are an overseas gem collector, local jewelry artisan, or
              wholesale merchant, our team welcomes you to our China Fort
              laboratory.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Contact Laboratory
              </Link>
              <Link href="/services" className="btn-secondary">
                View Testing Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
