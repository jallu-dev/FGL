export const metadata = {
  title: "About Us — Finest Gem Lab",
  description:
    "Sri Lanka's premier gemological laboratory with certified gemologists and state-of-the-art equipment. Trusted worldwide for accurate gem reports.",
  alternates: { canonical: "https://fgl.lk/about" },
  openGraph: {
    title: "About Finest Gem Lab (FGL) | Sri Lanka's Trusted Gem Lab",
    description:
      "Certified gemologists deliver accurate, internationally trusted gem identification & certification using advanced methods.",
    url: "https://fgl.lk/about",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Finest Gem Lab (FGL)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finest Gem Lab (FGL) is a leading gemological laboratory in Sri Lanka dedicated to providing accurate, unbiased, and professional gem identification, certification, and analysis services worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I choose FGL for gem certification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL uses state-of-the-art equipment, employs certified gemologists with international credentials, and is trusted by jewelers, collectors, and investors worldwide for fast, reliable, and secure gem certification.",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Finest Gem Lab (FGL) is dedicated to excellence in gem testing and
            certification, offering scientifically accurate reports and trusted
            services to clients worldwide.
          </p>
        </section>

        <section className="py-16 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading text-primary font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-accent">
                To provide accurate, unbiased, and professional gemological
                reports using advanced testing methods.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-primary font-bold mb-4">
                Why Choose Us
              </h2>
              <ul className="list-disc ml-5 text-accent space-y-2">
                <li>State-of-the-art equipment</li>
                <li>Certified gemologists</li>
                <li>Trusted worldwide</li>
                <li>Fast, reliable, and secure service</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
