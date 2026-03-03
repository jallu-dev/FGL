export const metadata = {
  title: "Client Testimonials — Trusted Gem Certification",
  description:
    "Client testimonials from jewelers, collectors & dealers worldwide. Trusted for accurate, professional gem certification & analysis services.",
  alternates: { canonical: "https://fgl.lk/testimonials" },
  openGraph: {
    title: "Testimonials | Finest Gem Lab (FGL)",
    description:
      "Hear from FGL's clients — jewelers, collectors & dealers who trust us for accurate, professional gem certification.",
    url: "https://fgl.lk/testimonials",
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Hasif Ali",
      feedback:
        "FGL's reports are the most accurate and professional. I trust them completely.",
    },
    {
      name: "Fowser Hussain",
      feedback:
        "Great customer service and quick turnaround. Highly recommend FGL!",
    },
    {
      name: "Ansareen Anver",
      feedback:
        "Their origin reports have helped us build credibility with clients worldwide.",
    },
  ];

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Finest Gem Lab",
    url: "https://fgl.lk",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.feedback,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <div>
        <section className="bg-primary py-20 pt-24 text-white text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Testimonials</h1>
          <p className="max-w-2xl mx-auto text-white/90">
            Hear what our clients have to say about their experience with FGL.
          </p>
        </section>

        <section className="py-16 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="premium-card p-6">
              <p className="text-accent italic mb-4">“{t.feedback}”</p>
              <p className="font-heading font-semibold text-primary">
                – {t.name}
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
