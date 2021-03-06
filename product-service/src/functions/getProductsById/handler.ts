import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { ErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ParamsType } from './schema';
import { productsList } from "../../mock";
import {ErrorTypes} from "../../types";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ParamsType> = async (event) => {
  try {
    const product = productsList.find(
        item => item.id === event?.pathParameters?.id
    );
    if (!product) {
      return ErrorResponse(ErrorTypes.Err404);
    }
    return formatJSONResponse(product);
  } catch (error) {
    return ErrorResponse(error.statusCode, error.message);
  }
};
export const main = middyfy(getProductsById);
