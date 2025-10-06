import { BaseProvider } from "@adminjs/upload";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs/promises';

export class R2Client extends BaseProvider {
  constructor(options) {
    super(options.bucket);
    this.bucket = options.bucket;
    this.accountId = options.accountId;
    this.cdnUrl = process.env.R2_CDN_URL || options.cdnUrl || options.publicUrl || `https://${options.bucket}.r2.dev`;

    console.log('Initializing R2Client with options:', {
      bucket: options.bucket,
      region: options.region,
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: options.credentials,
      cdnUrl: this.cdnUrl,
    });

    this.client = new S3Client({
      region: options.region,
      endpoint: options.endpoint || `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: options.credentials.accessKeyId,
        secretAccessKey: options.credentials.secretAccessKey,
      },
      forcePathStyle: true,
      tls: true,
    });
  }

  async upload(file, key) {
    if (!file || !key) {
      throw new Error('File and key are required for upload');
    }

    try {
      console.log('Uploading file:', {
        file: file.name,
        key: key,
        type: file.type,
        path: file.path
      });

      // Read the file contents from the temporary path
      const fileContent = await fs.readFile(file.path);

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileContent,
        ContentType: file.type || file.mimetype,
      });

      await this.client.send(command);
      console.log('File uploaded successfully to R2Client:', key);
      return key;
    } catch (error) {
      console.error('Error uploading file to R2Client:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async path(key) {
    if (!key || typeof key !== 'string') {
      console.warn('Invalid key provided to path():', key);
      return '';
    }
    return `${this.cdnUrl}/${key}`;
  }

  // This method is used by AdminJS to get file URLs
  async get(key) {
    return this.path(key);
  }

  // This method is for actually fetching file contents
  async getObject(params) {
    console.log('Getting file from R2Client:', params.Key);
    try {
      console.log('Getting file from R2:', params.Key);
      const command = new GetObjectCommand({
        Bucket: params.Bucket,
        Key: params.Key,
      });
      
      const response = await this.client.send(command);
      return {
        Body: response.Body.buffer,
        ContentType: response.ContentType || 'image/jpeg'
      }
    } catch (error) {
      console.error('Error fetching file from R2Client:', error);
      throw error;
    }
  }

  async delete(filePath) {
    if (!filePath || typeof filePath !== 'string') {
      console.warn('Invalid filePath provided to delete():', filePath);
      return;
    }

    try {
      console.log('Deleting file from R2Client:', filePath);
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: filePath,
      });

      await this.client.send(command);
    } catch (error) {
      console.error('Error deleting file from R2Client:', error, {
        bucket: this.bucket,
        key: filePath
      });
      // Don't throw the error to prevent blocking the delete operation
    }
  }

  get s3() {
    return this.client;
  }
}