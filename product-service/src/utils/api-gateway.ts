import type { APIGatewayProxyEvent } from "aws-lambda"
import {winstonLogger} from "./winstonLogger";

enum HTTPStatusCodes {
  OK = 200,
  SERVER_ERROR = 500,
}

const CORS_HEADERS = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

/* Helper to handle base lambda logic */
export const apiGatewayHandler = (controllerCallback: (event: APIGatewayProxyEvent) => Promise<any>) =>
    async (event: APIGatewayProxyEvent) => {
      let statusCode: HTTPStatusCodes;
      let result: any;

      try {
        winstonLogger.logRequest( `Lambda successfully invoked and finished` );
        result = await controllerCallback(event);
        return {
          statusCode: HTTPStatusCodes.OK,
          headers: {
              ...CORS_HEADERS
          },
          body: JSON.stringify(result)
        }
      } catch (err) {
        winstonLogger.logError( `Error: ${ err.message  }` );
        statusCode = err.statusCode || HTTPStatusCodes.SERVER_ERROR;
        return {
          statusCode,
          headers: {
              ...CORS_HEADERS
          },
          body: JSON.stringify( { message: err.message || 'Something went wrong !!!' })
        }
      }
    }
