import Image from "next/image";
import Link from "next/link";
import { FaGem, FaCertificate, FaMicroscope, FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-[url('/images/hero-background-3.jpg')] bg-cover bg-center bg-fixe pb-2">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-0" />

        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Scientific Precision in{" "}
              <span className="text-primary">Gemstone Analysis</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Finest Gem Lab provides expert gem certification and analysis with
              the highest standards of scientific precision and integrity.
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
              Our Expertise
            </h2>
            <p className="text-lg text-accent/80 max-w-2xl mx-auto">
              We offer comprehensive gemological services to jewelers,
              collectors, and investors worldwide.
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
                Scientific assessment of a gemstone&apos;s geographical origin
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
                The Finest Gem Lab
              </h2>
              <p className="text-lg text-accent/80 mb-6">
                With over two decades of experience in the industry, FGL has
                established itself as a trusted authority in gemological
                analysis and certification.
              </p>
              <p className="text-lg text-accent/80 mb-8">
                Our laboratory is equipped with the most advanced technology and
                staffed by highly qualified gemologists with international
                credentials.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-gold">
              <Image
                src="/images/tools.png"
                alt="Laboratory Equipment"
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
            Verify Your Gemstone Report
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Ensure the authenticity of your FGL certification with our secure
            online verification system.
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
                FGL&apos;s certification has significantly increased the value
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.1774362698338!2d79.98937668636934!3d6.476657345913174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae231f320cbd301%3A0x5331b386260a3a1e!2sFINEST%20GEM%20LAB!5e0!3m2!1sen!2slk!4v1764760126185!5m2!1sen!2slk"
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
