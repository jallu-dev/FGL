// scripts/migrate-s3-to-r2.mjs
// Run ONCE before deploying: node scripts/migrate-s3-to-r2.mjs
// Requires both AWS and R2 credentials to be set in .env.local

import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// ── Source: AWS S3 ──────────────────────────────────────────
const sourceS3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ── Destination: Cloudflare R2 ──────────────────────────────
const destR2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const SOURCE_BUCKET = "finest-gem-lab";
const DEST_BUCKET = process.env.R2_BUCKET_NAME;

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function migrate() {
  console.log("🚀 Starting S3 → R2 migration (with check-and-skip + retry logic)...\n");

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.R2_ACCESS_KEY_ID) {
    console.error("❌ Error: Missing credentials in environment variables.");
    process.exit(1);
  }

  let continuationToken;
  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  do {
    // List objects from S3 (paginated, 1000 per page)
    const listResult = await sourceS3.send(
      new ListObjectsV2Command({
        Bucket: SOURCE_BUCKET,
        ContinuationToken: continuationToken,
      })
    );

    const objects = listResult.Contents || [];
    console.log(`📦 Processing batch of ${objects.length} objects...`);

    for (const obj of objects) {
      const key = obj.Key;
      
      // 0. Check if already exists in Destination R2
      let existsInR2 = false;
      try {
        await destR2.send(
          new HeadObjectCommand({
            Bucket: DEST_BUCKET,
            Key: key,
          })
        );
        existsInR2 = true;
      } catch (headError) {
        // If it throws NoSuchKey or NotFound, it means it doesn't exist, which is expected
      }

      if (existsInR2) {
        console.log(`  ⏭️ SKIPPED (Already in R2): ${key}`);
        totalSkipped++;
        continue;
      }

      // 1. Download & Upload with Retry Mechanism
      let success = false;
      const attempts = 3;
      let lastError = null;

      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          // Download from S3
          const s3Object = await sourceS3.send(
            new GetObjectCommand({ Bucket: SOURCE_BUCKET, Key: key })
          );
          const buffer = await streamToBuffer(s3Object.Body);
          const contentType = s3Object.ContentType || "application/octet-stream";

          // Upload to R2 (same key, no ACL)
          await destR2.send(
            new PutObjectCommand({
              Bucket: DEST_BUCKET,
              Key: key,
              Body: buffer,
              ContentType: contentType,
            })
          );

          success = true;
          break;
        } catch (err) {
          lastError = err;
          if (attempt < attempts) {
            console.warn(`  ⚠️ Attempt ${attempt} failed for ${key} (${err.message}). Retrying in 1.5s...`);
            await new Promise((resolve) => setTimeout(resolve, 1500));
          }
        }
      }

      if (success) {
        console.log(`  ✅ ${key}`);
        totalMigrated++;
      } else {
        console.error(`  ❌ FAILED: ${key} after ${attempts} attempts — ${lastError.message}`);
        totalFailed++;
      }
    }

    continuationToken = listResult.NextContinuationToken;
  } while (continuationToken);

  console.log(`\n🏁 Migration complete!`);
  console.log(`   ✅ Migrated : ${totalMigrated}`);
  console.log(`   ⏭️ Skipped  : ${totalSkipped}`);
  console.log(`   ❌ Failed   : ${totalFailed}`);
}

migrate().catch((err) => {
  console.error("Fatal migration error:", err);
  process.exit(1);
});
