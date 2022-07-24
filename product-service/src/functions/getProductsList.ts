import { APIGatewayProxyEvent } from 'aws-lambda';

import { apiGatewayHandler } from '../utils/api-gateway';
import { ProductServiceInterface } from "../services/interfaces";

const getProductsList = (productService: ProductServiceInterface) => apiGatewayHandler(async (_event: APIGatewayProxyEvent) => {
  return await productService.getAllProducts();
});

export default getProductsList;
