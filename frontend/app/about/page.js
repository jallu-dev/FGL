export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary py-20 pt-24 text-white text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          Finest Gemological Laboratory (FGL) is dedicated to excellence in gem
          testing and certification, offering scientifically accurate reports
          and trusted services to clients worldwide.
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
  );
}
