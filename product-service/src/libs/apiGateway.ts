import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import {ErrorTypes} from "../types";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown> | Record<string, unknown>[]) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
  }
}

export const ErrorResponse = ( statusCode: ErrorTypes, message: string = '' ) => {
  const errorsMap = {
    '404': 'Product is not found.',
    '500': 'Something went wrong.',
  };
  return {
    statusCode,
    body: {
      message: message || errorsMap[statusCode.toString()],
    },
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
  }
}
