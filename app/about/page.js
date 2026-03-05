import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "About FGL | Leading Gem Lab in Sri Lanka",
  description:
    "FGL (Finest Gem Lab) - Sri Lanka's premier gem laboratory. Certified gemologists, state-of-the-art equipment, and internationally trusted gem certification. Leading gem lab Sri Lanka.",
  alternates: { canonical: "https://fgl.lk/about" },
  openGraph: {
    title: "About FGL - Finest Gem Lab | Sri Lanka's Premier Gem Laboratory",
    description:
      "FGL is Sri Lanka's leading gem lab with certified gemologists and advanced equipment. Internationally trusted for accurate gem certification and testing.",
    url: "https://fgl.lk/about",
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
        text: "FGL (Finest Gem Lab) is the leading gemological laboratory in Sri Lanka, dedicated to providing accurate, unbiased, and professional gem identification, certification, and analysis services. As Sri Lanka's premier gem lab, FGL is trusted worldwide for its scientifically accurate gem reports.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose FGL gem lab in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL is Sri Lanka's top gem laboratory, using state-of-the-art equipment, employing internationally certified gemologists, and trusted by jewelers, collectors, and investors worldwide for fast, reliable, and secure gem certification services.",
      },
    },
    {
      "@type": "Question",
      name: "Is FGL internationally recognised?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Finest Gem Lab (FGL) is trusted worldwide for its scientifically accurate gem reports and internationally recognised standards in gemological analysis and certification.",
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
        <Breadcrumbs items={breadcrumbItems} />
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            About FGL - Gem Lab Sri Lanka
          </h1>
          <p className="max-w-2xl mx-auto text-white/90">
            FGL (Finest Gem Lab) is Sri Lanka's premier gem laboratory,
            dedicated to excellence in gem testing and certification. As the
            leading gem lab in Sri Lanka, we offer scientifically accurate
            reports trusted by clients worldwide.
          </p>
        </section>

        <section className="py-16 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading text-primary font-bold mb-4">
                FGL's Mission in Sri Lanka
              </h2>
              <p className="text-accent">
                As Sri Lanka's leading gem laboratory, FGL aims to provide
                accurate, unbiased, and professional gemological reports using
                advanced testing methods, establishing the highest standards for
                gem certification in Sri Lanka.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-primary font-bold mb-4">
                Why Choose FGL Gem Lab
              </h2>
              <ul className="list-disc ml-5 text-accent space-y-2">
                <li>Sri Lanka's most advanced gem testing laboratory</li>
                <li>Internationally certified gemologists</li>
                <li>Trusted worldwide by gem traders and collectors</li>
                <li>Fast, reliable, and secure service</li>
                <li>State-of-the-art gemological equipment</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
