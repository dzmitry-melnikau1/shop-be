import * as handlers from './functions';
import { Client } from 'pg';
import { PgProductService } from './services/pg-product.service';

console.log(process.env);

const databaseClient = new Client();
databaseClient.connect();
const productService = new PgProductService(databaseClient)

export const getProductById = handlers.getProductById(productService);
export const getAllProducts = handlers.getProductsList(productService);
export const createProduct = handlers.createProduct(productService);
