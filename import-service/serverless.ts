//import type { AWS } from '@serverless/typescript';
import type { Serverless } from 'serverless/aws';

const PRODUCT_CATALOGUE_S3_BUCKET = 'product-images-catalogue-s3';
const UPLOADED_PATH = 'uploaded/';

/*const PRODUCT_CATALOGUE_S3_BUCKET = process.env.PRODUCT_CATALOGUE_S3_BUCKET;
const UPLOADED_PATH = process.env.UPLOADED_PATH;
const PARSED_PATH = process.env.PARSED_PATH;*/

const serverlessConfiguration: Serverless = {
  service: 'import-service',
  frameworkVersion: '2',
  variablesResolutionMode: '20210219',
  plugins: [
    'serverless-dotenv-plugin',
    'serverless-webpack'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ' s3:ListBucket',
        Resource: 'arn:aws:s3:::product-images-catalogue-s3'
      },
      {
        Effect: 'Allow',
        Action: ' s3:*',
        Resource: 'arn:aws:s3:::product-images-catalogue-s3'
      },
    ],
  },
  useDotenv: true,
  functions: {
    importProductsFile: {
      handler: 'handler.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: '/import',
            cors: true,
            request: {
              parameters: {
                querystring: {
                  name: true
                }
              }
            }
          } as any
        }
      ]
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: PRODUCT_CATALOGUE_S3_BUCKET,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: UPLOADED_PATH,
                suffix: '.csv'
              }
            ],
            existing: true
          }
        }

      ]
    }
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true
    },
    'serverless-offline': {
      httpPort: 5000
    },
  },
};

module.exports = serverlessConfiguration;
