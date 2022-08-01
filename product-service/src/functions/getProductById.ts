import { APIGatewayProxyEvent } from 'aws-lambda';

import { apiGatewayHandler } from '../utils/api-gateway';
import { ProductServiceInterface } from "../services/interfaces";

const getProductById = (productService: ProductServiceInterface) => apiGatewayHandler(async (_event: APIGatewayProxyEvent) => {
  const {productId} = _event.pathParameters;
  return  await productService.getProductById(productId);
});

export default getProductById;
