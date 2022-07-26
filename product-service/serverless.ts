import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
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
  },
  useDotenv: true,
  // import the function via paths
  functions: {
    getProduct: {
      handler: 'src/handler.getProduct',
      events: [
        {
          http: {
            method: 'get',
            path: '/products/{productId}',
            cors: true,
          } as any
        }
      ]
    },
    getProducts: {
      handler: 'src/handler.getProducts',
      events: [
        {
          http: {
            method: 'get',
            path: '/products',
            cors: true,
          } as any
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ['pg-native', 'mock-aws-s3', 'nock']
    },
    'serverless-offline': {
      httpPort: 5000
    },
  },
};

module.exports = serverlessConfiguration;
