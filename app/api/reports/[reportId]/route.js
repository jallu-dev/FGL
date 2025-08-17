import { pool } from "@/lib/db";
import { s3 } from "@/lib/s3";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

// Configure the route
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds

// GET single report
export async function GET(req, context) {
  try {
    const { reportId } = await context.params;

    if (!reportId) {
      return Response.json({ error: "Report ID is required" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT * FROM reports WHERE report_id = $1`,
        [reportId]
      );

      if (rows.length === 0) {
        return Response.json({ error: "Report not found" }, { status: 404 });
      }

      const report = rows[0];

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: report.image_file_path,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1h
      report.image_file_path = url;

      return Response.json({
        success: true,
        report,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Get report error:", error);
    return Response.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}

// PUT (Update) report
export async function PUT(req, { params }) {
  try {
    const { reportId } = params;

    if (!reportId) {
      return Response.json({ error: "Report ID is required" }, { status: 400 });
    }

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
    const species = formData.get("species");
    const variety = formData.get("variety");
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

    // Validate required fields
    const requiredFields = {
      description,
      species,
      variety,
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

    const client = await pool.connect();
    try {
      // First, get the current report to check if it exists and get current image path
      const { rows: currentReport } = await client.query(
        `SELECT * FROM reports WHERE report_id = $1`,
        [reportId]
      );

      if (currentReport.length === 0) {
        return Response.json({ error: "Report not found" }, { status: 404 });
      }

      let imagePath = currentReport[0].image_file_path; // Keep current image by default

      // Handle new image upload if provided
      const imageFile = formData.get("image");
      if (imageFile && imageFile instanceof File) {
        // Check file size
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

        // Convert file to buffer
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate new filename and S3 key
        const ext = imageFile.name.split(".").pop() || "jpg";
        const filename = `report_${randomUUID()}.${ext}`;
        const newKey = `reports/${filename}`;

        // Upload new image to S3
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: newKey,
            Body: buffer,
            ContentType: imageFile.type || "image/jpeg",
            ACL: "private",
          })
        );

        // Delete old image from S3 if it exists
        if (currentReport[0].image_file_path) {
          try {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: currentReport[0].image_file_path,
              })
            );
          } catch (deleteError) {
            console.warn("Failed to delete old image:", deleteError);
            // Continue with update even if old image deletion fails
          }
        }

        imagePath = newKey;
      }

      // Update the report in database
      await client.query(
        `UPDATE reports SET 
          track_no = $1, description = $2, species = $3, variety = $4, weight = $5, 
          measurement = $6, colour = $7, shape = $8, transparency = $9, origin = $10, 
          phenomenon = $11, remarks = $12, comments = $13, image_file_path = $14, 
          text_color = $15, contact_no = $16, updated_at = CURRENT_TIMESTAMP
         WHERE report_id = $17`,
        [
          track_no,
          description,
          species,
          variety,
          Number(weight),
          measurement,
          colour,
          shape,
          transparency,
          origin,
          phenomenon,
          remarks,
          comments,
          imagePath,
          text_color,
          contact_no,
          reportId,
        ]
      );

      return Response.json({ success: true, reportId }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Update error:", error);

    // Handle specific error types
    if (error.message?.includes("Body exceeded")) {
      return Response.json(
        { error: "File too large. Please use a file smaller than 10MB." },
        { status: 413 }
      );
    }

    return Response.json(
      { error: "Update failed. Please try again." },
      { status: 500 }
    );
  }
}

// DELETE report
export async function DELETE(req, { params }) {
  try {
    const { reportId } = params;

    if (!reportId) {
      return Response.json({ error: "Report ID is required" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      // First, get the report to check if it exists and get image path
      const { rows: currentReport } = await client.query(
        `SELECT * FROM reports WHERE report_id = $1`,
        [reportId]
      );

      if (currentReport.length === 0) {
        return Response.json({ error: "Report not found" }, { status: 404 });
      }

      // Delete image from S3 if it exists
      if (currentReport[0].image_file_path) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: currentReport[0].image_file_path,
            })
          );
        } catch (deleteError) {
          console.warn("Failed to delete image from S3:", deleteError);
          // Continue with database deletion even if S3 deletion fails
        }
      }

      // Delete report from database
      await client.query(`DELETE FROM reports WHERE report_id = $1`, [
        reportId,
      ]);

      return Response.json(
        { success: true, message: "Report deleted successfully" },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json(
      { error: "Delete failed. Please try again." },
      { status: 500 }
    );
  }
}
