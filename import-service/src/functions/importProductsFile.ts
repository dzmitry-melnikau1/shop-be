const BUCKET = process.env.BUCKET;

export const importProductsFile = ({s3}) => async (event) => {
    try {
        const catalogName = event.queryStringParameters.name;
        const catalogPath = `uploaded/${catalogName}`;
    
        const params = {
            Bucket: BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };
    
        return  await s3.getSignedUrlPromise('putObject', params)

    } catch (error) {
        return error;
    }
}
