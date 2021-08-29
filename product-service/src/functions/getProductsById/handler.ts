import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { ErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ParamsType } from './schema';
import { productsList } from "../../mock";
import {ErrorTypes} from "../../types";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof ParamsType> = async (event) => {
  try {
    const product = productsList.find(
        item => item.id === event?.pathParameters?.id
    );
    if (!product) {
      // @ts-ignore
      throw new Error(ErrorTypes.Err404);
    }
    return formatJSONResponse(product);
  } catch (error) {
    ErrorResponse(error.message);
  }
};
export const main = middyfy(getProductsById);
