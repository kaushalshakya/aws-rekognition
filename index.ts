import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.ACCESS_KEY_SECRET || "",
  },
});

const app = express();

const getObjectUrl = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET || "",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
};

getObjectUrl("370743602_879424850042988_1015590401435150050_n.jpg").then(
  (url: string): void => console.log(url)
);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});
