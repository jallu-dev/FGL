import { pool } from "@/lib/db";
import { s3 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gem Gallery — Certified Rubies, Sapphires, Emeralds & More",
  description:
    "Premium gemstone gallery featuring certified rubies, sapphires, emeralds & spinels examined by FGL's expert gemologists in Sri Lanka.",
  alternates: { canonical: "https://fgl.lk/gallery" },
  openGraph: {
    title: "Gem Gallery | Finest Gem Lab (FGL)",
    description:
      "Premium certified gemstones including rubies, sapphires, emeralds & spinels examined by FGL's expert gemologists.",
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
      title: "Natural Ruby Gemstone",
      description: "Premium natural ruby certified by Finest Gem Lab.",
      category: "Ruby",
    },
    {
      id: "f2",
      src: "/gallery/sapphire.jpg",
      title: "Natural Blue Sapphire",
      description: "Royal blue sapphire certified by expert gemologists.",
      category: "Sapphire",
    },
    {
      id: "f3",
      src: "/gallery/emerald.jpg",
      title: "Natural Emerald Gemstone",
      description: "Vibrant green emerald showcasing exquisite clarity.",
      category: "Emerald",
    },
    {
      id: "f4",
      src: "/gallery/spinel.jpg",
      title: "Natural Spinel Gemstone",
      description: "Exquisite natural spinel certified by Finest Gem Lab.",
      category: "Mixed",
    },
  ];

  const displayImages = dbImages.length > 0 ? dbImages : fallbackImages;

  return (
    <div>
      <section className="bg-primary py-20 pt-24 text-white text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Gem Gallery</h1>
        <p className="max-w-2xl mx-auto text-white/90 px-6">
          A showcase of premium gemstones examined and certified by FGL.
        </p>
      </section>

      {loadError && dbImages.length === 0 && (
        <div className="bg-amber-50 text-amber-800 text-center py-3 px-6 text-sm">
          Note: Showing default showcase images. Database is temporarily unavailable.
        </div>
      )}

      <section className="py-16 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <h3 className="font-heading font-bold text-lg text-primary mb-2 line-clamp-1" title={img.title}>
                  {img.title}
                </h3>
                {img.description && (
                  <p className="text-sm text-accent/80 line-clamp-3">
                    {img.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
