// app/api/verify/route.js
import { pool } from "@/lib/db";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req) {
  try {
    const { reportId } = await req.json();

    if (!reportId) {
      return Response.json({ error: "Report ID is required" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT
          created_at, 
          report_id,
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
          image_file_path,
          trade_name
         FROM reports 
         WHERE report_id = $1`,
        [reportId]
      );

      if (rows.length === 0) {
        return Response.json({
          success: false,
          status: "invalid",
          message:
            "No report found with this report id. Please check and try again.",
        });
      }

      const report = rows[0];

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: report.image_file_path,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1h

      // Return the report data with proper field names
      const formattedReport = {
        report_id: report.report_id,
        created_at: report.created_at,
        description: report.description,
        species: report.species,
        variety: report.variety,
        weight: report.weight,
        measurement: report.measurement,
        colour: report.colour,
        shape: report.shape,
        transparency: report.transparency,
        origin: report.origin,
        phenomenon: report.phenomenon,
        remarks: report.remarks,
        comments: report.comments,
        trade_name: report.trade_name,
        image_file_path: url,
      };

      return Response.json({
        success: true,
        status: "valid",
        report: formattedReport,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Verify report error:", error);
    return Response.json(
      {
        error: "Failed to verify report",
        success: false,
      },
      { status: 500 }
    );
  }
}
