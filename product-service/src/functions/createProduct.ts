import { APIGatewayProxyEvent } from 'aws-lambda';

import { apiGatewayHandler } from '../utils/api-gateway';
import { ProductServiceInterface } from "../services/interfaces";

const createProduct = async (productService: ProductServiceInterface) => apiGatewayHandler(async (_event: APIGatewayProxyEvent) => {
    // @ts-ignore
    const { product } = _event.body;
    return  await productService.createProduct(product);
});

export default createProduct;