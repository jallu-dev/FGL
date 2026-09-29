import Image from "next/image";
import Link from "next/link";
import { FaGem, FaCertificate, FaMicroscope, FaSearch } from "react-icons/fa";

export const metadata = {
  title:
    "Finest Gem Lab (FGL) | Gem Lab Sri Lanka | Expert Gem Certification & Testing Beruwala",
  description:
    "Finest Gem Lab (FGL) is Sri Lanka's leading gem lab in China Fort, Beruwala. Expert gem certification, gemstone testing & identification for ruby, sapphire, emerald. Trusted gem laboratory in Sri Lanka & near you.",
  alternates: { canonical: "https://fgl.lk" },
  openGraph: {
    title:
      "Finest Gem Lab (FGL) | Leading Gem Lab in Sri Lanka & China Fort Beruwala",
    description:
      "Finest Gem Lab (FGL) is Sri Lanka's premier gemological laboratory located in China Fort, Beruwala. Scientific gemstone certification, testing & identification for sapphire, ruby & emerald trusted worldwide.",
    url: "https://fgl.lk",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finest Gem Lab (FGL) | Leading Gemological Laboratory in Sri Lanka & Beruwala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Finest Gem Lab (FGL) | Gem Lab Sri Lanka & Beruwala | Gem Certification",
    description:
      "Finest Gem Lab (FGL) in China Fort, Beruwala: Expert gemstone certification, Ceylon sapphire testing & ruby identification in Sri Lanka.",
    images: ["/images/og-image.jpg"],
  },
};

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FGL (Finest Gem Lab) Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL (Finest Gem Lab) is the premier gemological laboratory in Sri Lanka, located in China Fort, Beruwala. FGL provides expert gem identification, certification, treatment detection, and geographical origin determination using advanced scientific methods.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the best gem lab in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL (Finest Gem Lab) is recognized as the leading gem laboratory in Sri Lanka, located in China Fort, Beruwala. It offers world-class gemstone certification and testing services with state-of-the-art equipment and certified gemologists.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Finest Gem Lab (FGL) located in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finest Gem Lab (FGL) is located at 64D/2F, China Fort Rd, Beruwala (12070), Sri Lanka — right in the heart of China Fort, Sri Lanka's historic gemstone trading hub. We provide walk-in gemstone testing and certification for merchants across Beruwala, Colombo, Ratnapura, and international clients.",
      },
    },
    {
      "@type": "Question",
      name: "How can I find a trusted gem testing lab near me in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are in Beruwala, Colombo, Galle, Kalutara, or Ratnapura looking for a 'gem testing lab near me', Finest Gem Lab (FGL) in China Fort, Beruwala is easily accessible. We offer rapid turnaround gem identification, Ceylon sapphire testing, and certified lab reports.",
      },
    },
    {
      "@type": "Question",
      name: "What types of gemstones does FGL certify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL certifies a wide range of precious gemstones including Ceylon blue sapphires, padparadscha, rubies, emeralds, spinels, alexandrites, and many other precious and semi-precious gemstones.",
      },
    },
    {
      "@type": "Question",
      name: "What gemstone certification services are available at FGL Beruwala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FGL provides comprehensive gemstone certification in Beruwala including Ceylon blue sapphire certification, ruby testing, emerald analysis, padparadscha verification, heat treatment detection, and geographical origin determination.",
      },
    },
    {
      "@type": "Question",
      name: "Does FGL determine the geographical origin of gemstones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FGL provides geographical origin determination for gemstones such as rubies (Burma, Mozambique, Sri Lanka), sapphires (Ceylon, Madagascar, Burma), and emeralds using advanced spectroscopy and trace element analysis.",
      },
    },
    {
      "@type": "Question",
      name: "Can FGL detect heat treatments and enhancements in sapphires?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Finest Gem Lab uses state-of-the-art spectroscopy (UV-Vis-NIR / FTIR) and high-magnification immersion microscopy to definitively detect thermal enhancement, beryllium diffusion, fracture filling, and synthetic corundum.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify my FGL gemstone certificate online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can instantly verify any FGL gemstone certificate online at fgl.lk/verify by entering your report ID or scanning the QR code printed on the report.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-[url('/images/hero-background-3.jpg')] bg-cover bg-center bg-fixe pb-2">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-0" />

        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              <span className="text-primary">FGL</span> - Sri Lanka&#39;s
              Premier <span className="text-primary">Gem Laboratory</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              FGL (Finest Gem Lab) is the leading gem lab in Sri Lanka,
              providing expert gemstone certification, testing, and
              identification with the highest standards of scientific precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/verify" className="btn-secondary">
                Verify Certificate
              </Link>
              <Link href="/services" className="btn-primary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              FGL Gem Lab Services in Sri Lanka
            </h2>
            <p className="text-lg text-accent/80 max-w-2xl mx-auto">
              As Sri Lanka&#39;s premier gem laboratory, FGL offers
              comprehensive gemological services to jewelers, collectors, and
              investors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="premium-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaGem className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Gem Identification
              </h3>
              <p className="text-accent/80">
                Scientific identification of gemstones using advanced
                spectroscopy and microscopy.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="premium-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaCertificate className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Certification
              </h3>
              <p className="text-accent/80">
                Comprehensive reports detailing the properties and quality of
                your gemstones.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="premium-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaMicroscope className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Advanced Analysis
              </h3>
              <p className="text-accent/80">
                Detailed microscopic examination and spectroscopic analysis for
                research purposes.
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="premium-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaSearch className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Origin Determination
              </h3>
              <p className="text-accent/80">
                Scientific assessment of a gemstone&#39;s geographical origin
                based on inclusions and properties.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                About FGL - Sri Lanka&#39;s Leading Gem Lab
              </h2>
              <p className="text-lg text-accent/80 mb-6">
                FGL (Finest Gem Lab) has established itself as the premier gem
                laboratory in Sri Lanka, trusted by jewelers, collectors, and
                gem traders worldwide for accurate gemstone testing and
                certification.
              </p>
              <p className="text-lg text-accent/80 mb-8">
                Our gem lab in Sri Lanka is equipped with state-of-the-art
                technology and staffed by internationally certified gemologists,
                making FGL the top choice for gem certification in Sri Lanka.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-gold">
              <Image
                src="/images/tools.png"
                alt="Finest Gem Lab Laboratory Equipment in Sri Lanka"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Report Verification CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Verify Your FGL Gemstone Certificate
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Instantly verify the authenticity of your FGL gem lab certification
            with our secure online verification system. All FGL reports issued
            in Sri Lanka can be verified online.
          </p>
          <Link
            href="/verify"
            className="btn-secondary-fill inline-block hover:scale-105"
          >
            Verify Now
          </Link>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-accent/80 max-w-2xl mx-auto">
              Trusted by jewelers, collectors, and gemstone enthusiasts
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="premium-card p-8 relative">
              <div className="text-secondary text-4xl absolute -top-4 left-6">
                &quot;
              </div>
              <p className="text-accent/80 mb-6 pt-4">
                The team at FGL provided exceptional service and detailed
                analysis of my ruby collection. Their reports are thorough and
                internationally recognized.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-primary">Isfahan Bakeer</h4>
                  <p className="text-sm text-accent/60">Colourstone Dealer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="premium-card p-8 relative">
              <div className="text-secondary text-4xl absolute -top-4 left-6">
                &quot;
              </div>
              <p className="text-accent/80 mb-6 pt-4">
                FGL&#39;s certification has significantly increased the value
                and credibility of my gemstone inventory. Their attention to
                detail is unmatched.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-primary">Minshath Risfan</h4>
                  <p className="text-sm text-accent/60">Gem Merchant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="premium-card p-8 relative">
              <div className="text-secondary text-4xl absolute -top-4 left-6">
                &quot;
              </div>
              <p className="text-accent/80 mb-6 pt-4">
                As a collector, I rely on accurate certifications. FGL has
                consistently provided detailed and accurate analysis for my rare
                gemstone collection.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-primary">Anfas Ansar</h4>
                  <p className="text-sm text-accent/60">Gemstone Collector</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn-primary">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-accent/80 max-w-2xl mx-auto mb-8">
            Contact our team of experts to discuss your gemological needs and
            how we can assist you.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
        <div className="flex justify-center mt-10 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.350756834872!2d79.9874871!3d6.477181300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22e1f963e0f17%3A0x1f4ff62b8ddb0fff!2sHidayathulla%20Gem%20Tower!5e0!3m2!1sen!2slk!4v1778177558850!5m2!1sen!2slk"
            width="60%"
            height="250"
            style={{ border: 0, borderRadius: 20 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
