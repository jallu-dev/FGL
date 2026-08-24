import { pool } from "@/lib/db";
import { s3 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Link from "next/link";
import {
  FaGem,
  FaMicroscope,
  FaShieldAlt,
  FaSearch,
  FaCertificate,
} from "react-icons/fa";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certified Gem Gallery — Sri Lanka Sapphires, Rubies, Emeralds | FGL",
  description:
    "Explore FGL's gemstone showcase featuring certified Ceylon blue sapphires, padparadscha, rubies, emeralds, spinels, and alexandrites tested in Sri Lanka.",
  alternates: { canonical: "https://fgl.lk/gallery" },
  openGraph: {
    title: "Gem Gallery | Finest Gem Lab (FGL)",
    description:
      "Premium certified natural gemstones examined by FGL's certified gemologists using advanced spectroscopy and origin determination.",
    url: "https://fgl.lk/gallery",
  },
};

export default async function GalleryPage() {
  let dbImages = [];
  let loadError = false;

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT * FROM gallery_images WHERE status = 'published' ORDER BY created_at DESC"
      );

      // Generate signed URLs
      dbImages = await Promise.all(
        rows.map(async (image) => {
          try {
            const command = new GetObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME,
              Key: image.r2_key,
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            return {
              id: image.id,
              src: url,
              title: image.title,
              description: image.description,
              category: image.category,
            };
          } catch (s3Err) {
            console.error(`S3 Error for key ${image.r2_key}:`, s3Err);
            return null;
          }
        })
      );
      // Filter out any that failed to sign
      dbImages = dbImages.filter(Boolean);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database connection error in gallery page:", error);
    loadError = true;
  }

  // Fallback mock images if database query fails or is empty
  const fallbackImages = [
    {
      id: "f1",
      src: "/gallery/ruby.jpg",
      title: "Natural Pigeon Blood Ruby",
      description:
        "Exceptional natural ruby with vibrant red saturation, examined and certified by Finest Gem Lab.",
      category: "Ruby",
    },
    {
      id: "f2",
      src: "/gallery/sapphire.jpg",
      title: "Ceylon Royal Blue Sapphire",
      description:
        "World-renowned natural Ceylon blue sapphire displaying vivid saturation and superior transparency.",
      category: "Sapphire",
    },
    {
      id: "f3",
      src: "/gallery/emerald.jpg",
      title: "Natural Fine Green Emerald",
      description:
        "Vibrant green emerald showcasing exquisite clarity, natural inclusions, and master lapidary cut.",
      category: "Emerald",
    },
    {
      id: "f4",
      src: "/gallery/spinel.jpg",
      title: "Natural Ceylon Red Spinel",
      description:
        "Exquisite untreated natural spinel tested for crystal structure and optical properties at FGL.",
      category: "Spinel",
    },
  ];

  const displayImages = dbImages.length > 0 ? dbImages : fallbackImages;

  const gemCategories = [
    {
      title: "Ceylon Blue Sapphires",
      desc: "Celebrated globally for their cornflower to royal blue hues, exceptional luster, and unheated purity mined in Sri Lanka's historic gem gravels.",
      icon: <FaGem className="text-secondary text-2xl" />,
    },
    {
      title: "Padparadscha Sapphires",
      desc: "The rarest of corundums, possessing an exquisite delicate blend of lotus pink and sunset orange that defines Sri Lankan gemological heritage.",
      icon: <FaGem className="text-secondary text-2xl" />,
    },
    {
      title: "Precious Rubies & Spinels",
      desc: "Rich chromium-bearing corundums and spinels evaluated for color intensity, crystal integrity, and definitive treatment detection.",
      icon: <FaGem className="text-secondary text-2xl" />,
    },
    {
      title: "Chrysoberyl & Alexandrite",
      desc: "Phenomenal color-changing alexandrites and sharp cat's eye chrysoberyls examined using advanced optical and spectroscopic instruments.",
      icon: <FaGem className="text-secondary text-2xl" />,
    },
  ];

  const testingPillars = [
    {
      title: "Spectroscopic Fingerprinting",
      desc: "UV-Vis-NIR and FTIR spectroscopy to identify mineral composition and detect synthetic growth or heat treatments.",
    },
    {
      title: "Microscopic Inclusion Analysis",
      desc: "High-magnification darkfield and polarized microscopy to determine natural versus synthetic origin and geological genesis.",
    },
    {
      title: "Refractive & Specific Gravity Testing",
      desc: "Precise optical refractometry and hydrostatic specific gravity measurement ensuring accurate mineral identification.",
    },
    {
      title: "Geographical Origin Determination",
      desc: "Trace element and inclusion profiling comparing gemstone signatures with international reference databases.",
    },
  ];

  const faqs = [
    {
      question: "What information is provided on an FGL gemstone certificate?",
      answer:
        "Each FGL report provides comprehensive scientific data including mineral species, variety, carat weight, measurements, colour grade, cut & shape, transparency, origin assessment, and explicit treatment status.",
    },
    {
      question: "How does FGL distinguish unheated from heated sapphires?",
      answer:
        "FGL gemologists examine microscopic rutile silk inclusions, discoid fractures, and spectroscopic absorption bands (such as FTIR OH-stretching bands) to definitively identify heat treatment or absence of enhancement.",
    },
    {
      question: "Can I verify certificates for gemstones shown in this gallery?",
      answer:
        "Yes. Every certified gemstone is issued an authentic FGL Report ID. You can enter any valid report ID on our Verify page (fgl.lk/verify) to inspect matching laboratory records instantly.",
    },
    {
      question: "How can I submit my gemstones to FGL for laboratory testing?",
      answer:
        "Gem merchants, jewelers, and private collectors can submit loose or mounted stones directly to our laboratory in Beruwala, Sri Lanka, or contact our team online to schedule intake.",
    },
  ];

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FGL Certified Gemstone Gallery",
    description:
      "A showcase of certified natural gemstones including Ceylon sapphires, rubies, emeralds, and spinels analyzed by Finest Gem Lab.",
    url: "https://fgl.lk/gallery",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: displayImages.map((img, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: img.title,
        description: img.description,
      })),
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
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
              Certified Gemstone Gallery
            </h1>
            <p className="max-w-3xl mx-auto text-white/90 text-lg">
              A curated showcase of premium natural gemstones examined,
              identified, and certified by FGL (Finest Gem Lab) — Sri Lanka&apos;s
              premier gemological laboratory.
            </p>
          </div>
        </section>

        {loadError && dbImages.length === 0 && (
          <div className="bg-amber-50 text-amber-800 text-center py-3 px-6 text-sm border-b border-amber-200">
            Note: Showing curated showcase samples. Live database connection is
            refreshing.
          </div>
        )}

        {/* Gallery Showcase Grid */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Certified Gemstone Showcase
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              Every stone featured in our laboratory has undergone rigorous
              optical, physical, and spectroscopic evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayImages.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-primary/95 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
                    {img.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-heading font-bold text-lg text-primary mb-2 line-clamp-1"
                      title={img.title}
                    >
                      {img.title}
                    </h3>
                    {img.description && (
                      <p className="text-sm text-accent/80 line-clamp-3">
                        {img.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary font-medium">
                    <span className="flex items-center gap-1">
                      <FaShieldAlt className="text-green-600" /> Certified by
                      FGL
                    </span>
                    <Link
                      href="/verify"
                      className="text-secondary hover:underline font-semibold"
                    >
                      Verify &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gem Varieties We Certify */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-3">
                Precious Gemstone Varieties Certified at FGL
              </h2>
              <p className="text-accent/80 max-w-2xl mx-auto">
                Sri Lanka is historically acclaimed as *Ratna Dweepa* (Gem
                Island). FGL specializes in certifying the island&apos;s most
                treasured mineral species.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gemCategories.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-accent/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytical Testing Standards */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Scientific Testing & Analysis Standards
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              Our gemological laboratory employs international standard testing
              methodologies to ensure absolute accuracy and authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testingPillars.map((pillar, idx) => (
              <div key={idx} className="premium-card p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <FaMicroscope className="text-primary text-xl shrink-0" />
                  <h3 className="font-heading font-bold text-lg text-primary">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-accent/80 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-3">
                Gem Gallery & Certification FAQs
              </h2>
              <p className="text-accent/80">
                Common questions about certified gemstone analysis and reports.
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
          </div>
        </section>

        {/* Verification CTA */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Have an FGL Gemstone Report to Verify?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Verify your gemstone certificate online instantly by entering the
              Report ID to review complete scientific laboratory records.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/verify" className="btn-secondary-fill">
                Verify Report ID
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
