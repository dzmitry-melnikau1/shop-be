import * as ctrl from './src/controllers';
import { winstonLogger } from './src/utils/winstonLogger';


import { APIGatewayProxyEvent, S3Event } from 'aws-lambda';
import 'source-map-support/register';
import {
   apiGatewayHandler,
    s3BucketHandler,
} from './src/utils/lambda-handlers';


export const importProductsFile = apiGatewayHandler((event: APIGatewayProxyEvent) => {
    const { name } = event.queryStringParameters || {};

    winstonLogger.logRequest(`file name from importProductFile ===>  ${name}`)

    return ctrl.importProductsFile(name);
});

export const importFileParser = s3BucketHandler(async (event: S3Event) => {
    for (const record of event.Records) {
        await ctrl.importFileParser(record.s3.object.key);
    }
});

