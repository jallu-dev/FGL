import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import {
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaMicroscope,
  FaGlobeAmericas,
  FaClock,
} from "react-icons/fa";

export const metadata = {
  title: "Client Testimonials & Reviews | Trusted Gem Lab Sri Lanka | FGL Beruwala",
  description:
    "Read verified reviews and testimonials from international gem dealers, collectors, and jewelers who trust Finest Gem Lab (FGL) in Beruwala, Sri Lanka for certified testing.",
  alternates: { canonical: "https://fgl.lk/testimonials" },
  openGraph: {
    title: "Client Testimonials | Finest Gem Lab (FGL) Sri Lanka",
    description:
      "Discover why jewelers, gemstone merchants, and collectors worldwide choose Finest Gem Lab in Beruwala, Sri Lanka for precise gemstone testing and certified origin reports.",
    url: "https://fgl.lk/testimonials",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finest Gem Lab Client Reviews Beruwala Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials | Finest Gem Lab Beruwala",
    description:
      "Trusted gem testing reviews for Finest Gem Lab in Beruwala, Sri Lanka.",
    images: ["/images/og-image.jpg"],
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Hasif Ali",
      role: "Fine Jewelry Dealer",
      location: "Colombo, Sri Lanka",
      rating: 5,
      feedback:
        "FGL's reports are the most accurate and professional in Sri Lanka. The spectroscopy and inclusion analysis give our overseas buyers complete confidence in every purchase.",
      tag: "Sapphire Certification",
    },
    {
      name: "Fowser Hussain",
      role: "Gem Exporter & Merchant",
      location: "Beruwala, Sri Lanka",
      rating: 5,
      feedback:
        "Great customer service, transparent communication, and rapid turnaround times. FGL's certificate format is clean, modern, and easily verifiable online by our clients worldwide.",
      tag: "Export Certification",
    },
    {
      name: "Ansareen Anver",
      role: "Precious Stone Collector",
      location: "Dubai, UAE",
      rating: 5,
      feedback:
        "Their geographical origin determination and treatment detection reports have helped us build immense credibility. FGL is our premier choice for certifying rare natural gemstones.",
      tag: "Origin Determination",
    },
    {
      name: "Isfahan Bakeer",
      role: "Colourstone Specialist",
      location: "Bangkok, Thailand",
      rating: 5,
      feedback:
        "The level of detail in FGL gemstone reports is exceptional. From microscopic photograph clarity to precise carat weight and colour grading, they set a new benchmark for gem testing.",
      tag: "Gem Identification",
    },
    {
      name: "Minshath Risfan",
      role: "Wholesale Gem Merchant",
      location: "Geneva, Switzerland",
      rating: 5,
      feedback:
        "Working with FGL has significantly streamlined our quality control and gemstone verification. Their online QR verification system gives our European clients instant peace of mind.",
      tag: "Online Verification",
    },
    {
      name: "Anfas Ansar",
      role: "High Jewelry Manufacturer",
      location: "London, UK",
      rating: 5,
      feedback:
        "As a collector and jeweler dealing in unheated Ceylon sapphires and fine spinels, I rely solely on trusted laboratories. FGL delivers scientific accuracy with unwavering integrity.",
      tag: "Unheated Gemstones",
    },
  ];

  const trustPoints = [
    {
      icon: <FaMicroscope className="text-2xl text-primary" />,
      title: "Advanced Scientific Analysis",
      desc: "Equipped with state-of-the-art spectrometers, refractometers, and gemological microscopes for foolproof identification.",
    },
    {
      icon: <FaShieldAlt className="text-2xl text-primary" />,
      title: "Unbiased & Independent",
      desc: "Completely independent laboratory evaluation adhering strictly to international gemological standards.",
    },
    {
      icon: <FaGlobeAmericas className="text-2xl text-primary" />,
      title: "Internationally Recognized",
      desc: "Trusted by gem traders, jewelers, and auction houses across Asia, Europe, the Middle East, and the Americas.",
    },
    {
      icon: <FaClock className="text-2xl text-primary" />,
      title: "Fast & Secure Turnaround",
      desc: "Prompt reporting with secure handling procedures to ensure your valuable gemstones are protected at all times.",
    },
  ];

  const faqs = [
    {
      question: "How can clients verify an FGL gemstone certificate?",
      answer:
        "Every FGL certificate comes with a unique Report ID and a QR code. Anyone can instantly verify certificate authenticity by scanning the QR code or visiting fgl.lk/verify to view complete matching laboratory records.",
    },
    {
      question: "Are FGL gemstone reports accepted internationally?",
      answer:
        "Yes. FGL reports follow standardized international gemological terminology and testing protocols, making them widely recognized by gemstone merchants, collectors, and jewelers worldwide.",
    },
    {
      question: "What gemstone treatments does FGL detect?",
      answer:
        "Our laboratory detects all standard and advanced gemstone treatments, including thermal enhancement (heat treatment), beryllium diffusion, fracture filling, glass filling, irradiation, and surface coating.",
    },
    {
      question: "How can I submit gemstones to FGL for testing?",
      answer:
        "You can visit our laboratory in Sri Lanka or contact our team via our Contact page to arrange secure gemstone intake and certification services.",
    },
  ];

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Finest Gem Lab",
    url: "https://fgl.lk",
    image: "https://fgl.lk/images/og-image.jpg",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "64D/2F, China Fort Rd",
      addressLocality: "Beruwala",
      postalCode: "12070",
      addressCountry: "LK",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: String(testimonials.length),
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.feedback,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Client Testimonials & Reviews
            </h1>
            <p className="max-w-3xl mx-auto text-white/90 text-lg">
              Hear from international gemstone dealers, collectors, and fine
              jewelers who rely on FGL (Finest Gem Lab) for uncompromising
              accuracy in gemstone certification and origin testing.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-xl fill-current" />
                ))}
              </div>
              <span className="text-white/90 font-medium text-sm md:text-base">
                5.0 Rating based on verified gem merchant reviews
              </span>
            </div>
          </div>
        </section>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Testimonials", href: null },
          ]}
        />

        {/* Testimonials Grid */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Trusted Worldwide by the Gem Industry
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              From Colombo and Beruwala to Bangkok, Dubai, and Geneva, our
              reports empower dealers and collectors with scientifically verified
              gemstone authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="premium-card p-8 flex flex-col justify-between hover:border-secondary transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex text-secondary">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} size={16} />
                      ))}
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-accent italic mb-6 leading-relaxed">
                    “{t.feedback}”
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-primary">
                      {t.name}
                    </h3>
                    <p className="text-xs text-accent/70">{t.role}</p>
                    <p className="text-xs text-accent/50">{t.location}</p>
                  </div>
                  <div
                    className="flex items-center text-green-600 text-xs gap-1"
                    title="Verified Client"
                  >
                    <FaCheckCircle />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose FGL Trust Pillars */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-3">
                Why Gem Professionals Choose FGL
              </h2>
              <p className="text-accent/80 max-w-2xl mx-auto">
                Built on scientific integrity, certified gemological expertise,
                and state-of-the-art analytical equipment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {point.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    {point.title}
                  </h3>
                  <p className="text-accent/70 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-accent/80">
              Everything you need to know about our certification reports and
              verification process.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="premium-card p-6">
                <h3 className="text-lg font-heading font-bold text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-accent/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Certify or Verify Your Gemstones Today
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Experience the highest standard of scientific gem testing in Sri
              Lanka. Instant online verification available for all reports.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/verify" className="btn-secondary-fill">
                Verify Certificate
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Laboratory
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
