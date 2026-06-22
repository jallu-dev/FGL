import { pool } from "@/lib/db";
import { s3 } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// DELETE /api/images/[id] - Delete a gallery image
export async function DELETE(req, context) {
  let client;
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json({ error: "Image ID is required." }, { status: 400 });
    }

    client = await pool.connect();

    // 1. Fetch image from DB to get the R2 key
    const { rows } = await client.query(
      "SELECT * FROM gallery_images WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return Response.json({ error: "Image not found." }, { status: 404 });
    }

    const image = rows[0];

    // 2. Delete from Cloudflare R2
    if (image.r2_key) {
      try {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: image.r2_key,
          })
        );
      } catch (r2Error) {
        console.warn(`Failed to delete object from R2: ${image.r2_key}`, r2Error);
        // Continue database deletion even if R2 deletion fails
      }
    }

    // 3. Delete from DB
    await client.query("DELETE FROM gallery_images WHERE id = $1", [id]);

    return Response.json(
      { success: true, message: "Gallery image deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete gallery image error:", error);
    return Response.json(
      { error: "Failed to delete gallery image." },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// PATCH /api/images/[id] - Update gallery image properties (like status)
export async function PATCH(req, context) {
  let client;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, title, description, category } = body;

    if (!id) {
      return Response.json({ error: "Image ID is required." }, { status: 400 });
    }

    client = await pool.connect();

    // Fetch existing image
    const { rows: checkRows } = await client.query(
      "SELECT * FROM gallery_images WHERE id = $1",
      [id]
    );

    if (checkRows.length === 0) {
      return Response.json({ error: "Image not found." }, { status: 404 });
    }

    const currentImage = checkRows[0];

    // Construct update query dynamically based on provided fields
    const updateFields = [];
    const queryValues = [];
    let paramIndex = 1;

    if (status !== undefined) {
      if (status !== "published" && status !== "draft") {
        return Response.json(
          { error: "Status must be either 'published' or 'draft'." },
          { status: 400 }
        );
      }
      updateFields.push(`status = $${paramIndex++}`);
      queryValues.push(status);
    }

    if (title !== undefined) {
      if (title.trim() === "") {
        return Response.json({ error: "Title cannot be empty." }, { status: 400 });
      }
      updateFields.push(`title = $${paramIndex++}`);
      queryValues.push(title);
    }

    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex++}`);
      queryValues.push(description);
    }

    if (category !== undefined) {
      updateFields.push(`category = $${paramIndex++}`);
      queryValues.push(category);
    }

    if (updateFields.length === 0) {
      return Response.json({ error: "No fields to update." }, { status: 400 });
    }

    // Add timestamp update
    updateFields.push(`updated_at = NOW()`);

    // Add ID to query values
    queryValues.push(id);
    const idParamIndex = paramIndex;

    const queryText = `
      UPDATE gallery_images 
      SET ${updateFields.join(", ")} 
      WHERE id = $${idParamIndex} 
      RETURNING *
    `;

    const { rows } = await client.query(queryText, queryValues);

    return Response.json(
      { success: true, image: rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update gallery image error:", error);
    return Response.json(
      { error: "Failed to update gallery image." },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}
