import * as s3 from '../services/s3-backet.service';

export async function importProductsFile(fileName: string): Promise<string> {
    return  await s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.PRODUCT_CATALOGUE_S3_BUCKET,
        Key: `${process.env.UPLOADED_PATH}/${fileName}`,
        Expires: 60,
        ContentType: 'text/csv',
    });
}


export default importProductsFile;
