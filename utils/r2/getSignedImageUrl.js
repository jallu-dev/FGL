import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/r2";

export async function getSignedImageUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 2 });
  return url;
}
