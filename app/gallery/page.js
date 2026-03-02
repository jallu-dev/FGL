import Image from "next/image";

export const metadata = {
  title: "Gem Gallery — Certified Rubies, Sapphires, Emeralds & More",
  description:
    "Browse FGL's gallery of premium gemstones — rubies, sapphires, emeralds, spinels — examined and certified by expert gemologists at Finest Gem Lab, Sri Lanka.",
  alternates: { canonical: "https://fgl.lk/gallery" },
  openGraph: {
    title: "Gem Gallery | Finest Gem Lab (FGL)",
    description:
      "A showcase of premium certified gemstones including rubies, sapphires, emeralds, and spinels, examined by FGL's expert gemologists.",
    url: "https://fgl.lk/gallery",
  },
};

export default function GalleryPage() {
  const images = [
    {
      src: "/gallery/ruby.jpg",
      alt: "Natural ruby gemstone certified by Finest Gem Lab",
    },
    {
      src: "/gallery/sapphire.jpg",
      alt: "Natural sapphire gemstone certified by Finest Gem Lab",
    },
    {
      src: "/gallery/emerald.jpg",
      alt: "Natural emerald gemstone certified by Finest Gem Lab",
    },
    {
      src: "/gallery/spinel.jpg",
      alt: "Natural spinel gemstone certified by Finest Gem Lab",
    },
  ];

  return (
    <div>
      <section className="bg-primary py-20 pt-24 text-white text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Gem Gallery</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          A showcase of premium gemstones examined and certified by FGL.
        </p>
      </section>

      <section className="py-16 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
