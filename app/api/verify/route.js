// app/api/verify/route.js
import { pool } from "@/lib/db";

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
          comments
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

      // Return the report data with proper field names
      const formattedReport = {
        report_id: report.report_id,
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
