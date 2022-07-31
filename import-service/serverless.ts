import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  variablesResolutionMode: '20210219',
  plugins: [
    'serverless-offline',
    'serverless-dotenv-plugin',
    'serverless-webpack'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
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
        Action: ' s3:*',
        Resource: `arn:aws:s3:::${process.env.PRODUCT_CATALOGUE_S3_BUCKET}`
      },
    ],
  },
  useDotenv: true,
  // import the function via paths
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
            bucket: process.env.PRODUCT_CATALOGUE_S3_BUCKET,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: process.env.UPLOADED_PATH,
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
