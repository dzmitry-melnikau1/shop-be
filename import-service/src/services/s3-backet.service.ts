import {
  S3,
} from 'aws-sdk';
import { Readable } from 'stream';
import {winstonLogger} from "../utils/winstonLogger";

function getS3Client(): S3 {
  return new S3();
}

export function getSignedUrlPromise(operation: string, params: any): Promise<string> {
  const s3 =  getS3Client();
  return s3.getSignedUrlPromise(operation, params);
}

export function createObjectReadStream(params: S3.GetObjectRequest): Readable {
  const s3 =  getS3Client();
  winstonLogger.logRequest(`getObject, ${params}`);
  return s3.getObject(params).createReadStream();
}

export function copyObject(params: S3.CopyObjectRequest): Promise<any> {
  const s3 =  getS3Client();
  winstonLogger.logRequest('copyObject');
  return s3.copyObject(params).promise();
}

export function deleteObject(params: S3.DeleteObjectRequest): Promise<any> {
  const s3 =  getS3Client();
  winstonLogger.logRequest('deleteObject');
  return s3.deleteObject(params).promise();
}

