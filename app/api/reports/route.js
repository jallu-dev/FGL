import { pool } from "@/lib/db";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// Configure the route
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds for file upload

export async function POST(req) {
  try {
    // Check content length before processing
    const contentLength = req.headers.get("content-length");
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength && parseInt(contentLength) > maxSize) {
      return Response.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }

    // Parse FormData with error handling
    let formData;
    try {
      formData = await req.formData();
    } catch (error) {
      console.error("FormData parsing error:", error);
      return Response.json(
        { error: "Failed to parse form data. File may be too large." },
        { status: 413 }
      );
    }

    // Extract form fields
    const description = formData.get("description");
    const species = formData.get("species") || "";
    const variety = formData.get("variety") || "";
    const weight = formData.get("weight");
    const measurement = formData.get("measurement");
    const colour = formData.get("colour");
    const shape = formData.get("shape");
    const transparency = formData.get("transparency");
    const origin = formData.get("origin") || "";
    const phenomenon = formData.get("phenomenon") || "";
    const remarks = formData.get("remarks") || "";
    const comments = formData.get("comments");
    const text_color = formData.get("text_color");
    const track_no = formData.get("track_no");
    const contact_no = formData.get("contact_no");
    const trade_name = formData.get("trade_name") || "";
    const treatment = formData.get("treatment") || "";
    const note = formData.get("note") || "";

    // Extract and validate file
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return Response.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Check file size again
    if (imageFile.size > maxSize) {
      return Response.json(
        {
          error: `File too large. Size: ${(
            imageFile.size /
            1024 /
            1024
          ).toFixed(2)}MB. Maximum: 10MB.`,
        },
        { status: 413 }
      );
    }

    // Validate required fields
    const requiredFields = {
      description,
      weight,
      measurement,
      colour,
      shape,
      transparency,
      comments,
      text_color,
      track_no,
      contact_no,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.toString().trim() === "")
      .map(([key, _]) => key);

    if (missingFields.length > 0) {
      return Response.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate filename and S3 key
    const ext = imageFile.name.split(".").pop() || "jpg";
    const filename = `report_${randomUUID()}.${ext}`;
    const key = `reports/${filename}`;

    // Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: imageFile.type || "image/jpeg",
        ACL: "private",
      })
    );

    // Generate report ID
    const reportId = `FGL${Date.now().toString().slice(4)}`;

    // Save to database
    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO reports (
          report_id, track_no, description, species, variety, weight, measurement, colour,
          shape, transparency, origin, phenomenon, remarks, comments, image_file_path, text_color, contact_no, trade_name, treatment, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
        [
          reportId,
          track_no,
          description,
          species,
          variety,
          weight,
          measurement,
          colour,
          shape,
          transparency,
          origin,
          phenomenon,
          remarks,
          comments,
          key,
          text_color,
          contact_no,
          trade_name,
          treatment,
          note,
        ]
      );
    } finally {
      client.release();
    }

    return Response.json({ success: true, reportId }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);

    // Handle specific error types
    if (error.message?.includes("Body exceeded")) {
      return Response.json(
        { error: "File too large. Please use a file smaller than 10MB." },
        { status: 413 }
      );
    }

    return Response.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const client = await pool.connect();

    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search")?.trim() || "";
      const offset = (page - 1) * limit;

      // --- Main Query ---
      let whereClause = "";
      let values = [limit, offset];

      if (search) {
        whereClause = `WHERE report_id ILIKE $3 OR CAST(track_no AS TEXT) ILIKE $3 OR contact_no ILIKE $3`;
        values = [limit, offset, `%${search}%`];
      }

      const { rows } = await client.query(
        `
        SELECT id, track_no, report_id, species, variety, contact_no, treatment, weight, created_at
        FROM reports
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
        `,
        values
      );

      // --- Count Query ---
      let countQuery;
      if (search) {
        countQuery = await client.query(
          `
          SELECT COUNT(*) AS total
          FROM reports
          WHERE report_id ILIKE $1 OR CAST(track_no AS TEXT) ILIKE $1 OR contact_no ILIKE $1
          `,
          [`%${search}%`]
        );
      } else {
        countQuery = await client.query(
          `
          SELECT COUNT(*) AS total
          FROM reports
          `
        );
      }

      return Response.json(
        {
          success: true,
          rows,
          total: parseInt(countQuery.rows[0].total),
          page,
          limit,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Fetch error:", error);

      return Response.json(
        { error: "Error while retrieving reports data." },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Connection error:", error);

    return Response.json({ error: "Error while connection." }, { status: 500 });
  }
}
