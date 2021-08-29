import 'source-map-support/register';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {ErrorResponse, formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {ParamsType} from './schema';
import {productsList} from '../../mock/';
import {ErrorTypes} from "../../types";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ParamsType> = async (_event) => {
  try {
    return formatJSONResponse(productsList);
  } catch (error) {
    ErrorResponse(ErrorTypes.Err500);
  }
};

export const main = middyfy(getProductsList);
