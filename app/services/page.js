export const metadata = {
  title: "Gemological Services — Gem Identification, Certification & More",
  description:
    "FGL offers expert gemological services including gem identification, treatment detection, geographical origin determination, and customized gem certification backed by cutting-edge scientific technology.",
  alternates: { canonical: "https://fgl.lk/services" },
  openGraph: {
    title: "Gemological Services | Finest Gem Lab (FGL)",
    description:
      "Explore FGL's full range of gemological services: gem identification, treatment detection, origin determination, and customized certification for jewelers, collectors, and investors.",
    url: "https://fgl.lk/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Gemological Services — Finest Gem Lab",
  description: "Expert gemological services offered by Finest Gem Lab (FGL)",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Gem Identification",
        description:
          "Scientific analysis to accurately identify gemstone species and varieties using advanced spectroscopy and microscopy.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Treatment Detection",
        description:
          "Advanced testing to determine if a gemstone has undergone any enhancements or treatments such as heat treatment, filling, or coating.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Origin Determination",
        description:
          "Evaluating the geographical origins of gemstones based on inclusions, trace elements, and spectroscopic data.",
        provider: { "@type": "Organization", name: "Finest Gem Lab" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Customized Certification",
        description:
          "Tailored gemstone certificates based on individual and trade requirements, meeting international gemological standards.",
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
      name: "What gemological services does FGL offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finest Gem Lab (FGL) offers gem identification, treatment detection, geographical origin determination, and customized gem certification using advanced scientific methods.",
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
      name: "Can FGL detect gemstone treatments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FGL uses advanced testing methods to detect heat treatment, filling, coating, and other enhancements commonly applied to gemstones.",
      },
    },
    {
      "@type": "Question",
      name: "Does FGL provide geographical origin reports for gems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FGL evaluates the geographical origin of gemstones based on inclusions, trace elements, and spectroscopic signatures, issuing origin determination reports.",
      },
    },
  ],
};

export default function ServicesPage() {
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
          <h1 className="text-4xl font-heading font-bold mb-4">Our Services</h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Explore our range of gemological services backed by cutting-edge
            technology and global standards.
          </p>
        </section>

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
