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
  );
}
