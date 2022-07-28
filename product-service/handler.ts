import * as handlers from './src/functions';
import { Client } from 'pg';
import { PgProductService } from './src/services/pg-product.service';

const {PG_HOST, PG_DATABASE, PG_PASSWORD, PG_USERNAME} = process.env;

const dbOptions = {
    host: PG_HOST,
    port: 5432,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
}

const databaseClient = new Client(dbOptions);
databaseClient.connect();
const productService = new PgProductService(databaseClient)

export const getProductById = handlers.getProductById(productService);
export const getAllProducts = handlers.getProductsList(productService);
export const createProduct = handlers.createProduct(productService);
