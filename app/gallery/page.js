import Image from "next/image";

export default function GalleryPage() {
  const images = [
    "/gallery/ruby.jpg",
    "/gallery/sapphire.jpg",
    "/gallery/emerald.jpg",
    "/gallery/spinel.jpg",
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
              src={img}
              alt={`Gem ${i}`}
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
