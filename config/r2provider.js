import { R2Client } from "./r2client.js";
import dotenv from "dotenv";
dotenv.config();

const R2Provider = new R2Client({
  bucket: process.env.R2_BUCKET_NAME,
  accountId: process.env.R2_ACCOUNT_ID,
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export default R2Provider;