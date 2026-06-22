import { pool } from "@/lib/db";
import { s3 } from "@/lib/r2";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds

// GET /api/images - Fetch gallery images
export async function GET(req) {
  let client;
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    client = await pool.connect();

    let queryText = "SELECT * FROM gallery_images ORDER BY created_at DESC";
    let queryParams = [];

    if (status === "published" || status === "draft") {
      queryText = "SELECT * FROM gallery_images WHERE status = $1 ORDER BY created_at DESC";
      queryParams = [status];
    }

    const { rows } = await client.query(queryText, queryParams);

    // Generate signed URLs for all images
    const imagesWithUrls = await Promise.all(
      rows.map(async (image) => {
        try {
          const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: image.r2_key,
          });
          // Signed URL valid for 1 hour
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          return {
            ...image,
            src: url,
          };
        } catch (s3Error) {
          console.error(`Error generating signed URL for key ${image.r2_key}:`, s3Error);
          return {
            ...image,
            src: null,
            error: "Failed to load image url",
          };
        }
      })
    );

    return Response.json({ success: true, images: imagesWithUrls }, { status: 200 });
  } catch (error) {
    console.error("Fetch gallery images error:", error);
    return Response.json(
      { error: "Error retrieving gallery images." },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// POST /api/images - Upload and create a new gallery image
export async function POST(req) {
  try {
    const contentLength = req.headers.get("content-length");
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength && parseInt(contentLength) > maxSize) {
      return Response.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }

    let formData;
    try {
      formData = await req.formData();
    } catch (error) {
      console.error("FormData parsing error:", error);
      return Response.json(
        { error: "Failed to parse form data." },
        { status: 400 }
      );
    }

    const title = formData.get("title");
    const description = formData.get("description") || "";
    const category = formData.get("category") || "Mixed";
    const status = formData.get("status") || "published"; // 'published' or 'draft'
    const imageFile = formData.get("image");

    if (!title || title.toString().trim() === "") {
      return Response.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    if (!imageFile || !(imageFile instanceof File)) {
      return Response.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    if (imageFile.size > maxSize) {
      return Response.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate filename and R2 key
    const ext = imageFile.name.split(".").pop() || "jpg";
    const filename = `gallery_${randomUUID()}.${ext}`;
    const r2Key = `gallery/${filename}`;

    // Upload to Cloudflare R2
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Key,
        Body: buffer,
        ContentType: imageFile.type || "image/jpeg",
      })
    );

    // Save metadata to Database
    const client = await pool.connect();
    let newRow;
    try {
      const result = await client.query(
        `INSERT INTO gallery_images (title, description, category, r2_key, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [title.toString(), description.toString(), category.toString(), r2Key, status.toString()]
      );
      newRow = result.rows[0];
    } finally {
      client.release();
    }

    // Generate immediate signed URL for response
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: newRow.r2_key,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return Response.json(
      {
        success: true,
        image: {
          ...newRow,
          src: signedUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery upload error:", error);
    return Response.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
