import { pipeline } from 'stream';
import * as csv from 'csv-parser';

import * as s3 from '../services/s3-backet.service';
import { winstonLogger } from "../utils/winstonLogger";

const importFileParser = async (fileName: string): Promise<void> => {
    winstonLogger.logRequest(`parseProductsFile, ${fileName}`);

    const s3ReadStream = s3.createObjectReadStream({
        Bucket: process.env.PRODUCT_CATALOGUE_S3_BUCKET,
        Key: fileName,
    });

    const csvStream = csv().on('data', (product) => {
        winstonLogger.logRequest(`CSV Lin', ${product}`);
    });

    await new Promise<void>((resolve, reject) => {
        pipeline(
            s3ReadStream,
            csvStream,
            async (error) => {
                if (error) {
                    return reject(error);
                }
                try {
                    await s3.copyObject({
                        CopySource: `${process.env.PRODUCT_CATALOGUE_S3_BUCKET}/${fileName}`,
                        Bucket: process.env.PRODUCT_CATALOGUE_S3_BUCKET,
                        Key: fileName.replace(process.env.UPLOADED_PATH, process.env.PARSED_PATH),
                    });

                    await s3.deleteObject({
                        Bucket: process.env.PRODUCT_CATALOGUE_S3_BUCKET,
                        Key: fileName
                    });

                    resolve();
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
}

export default importFileParser;
