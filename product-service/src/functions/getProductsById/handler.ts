import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const getProductsById = async () => {
  return formatJSONResponse({
    "headers": {
      "Content-Type": "application/json",
      "Status-Code": 200
    },
    "body": {
      "product" : {
        "count": 4,
        "description": "Short Product Description1",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 2.4,
        "title": "ProductOne"
      }
    }

  });
};

export const main = middyfy(getProductsById );
