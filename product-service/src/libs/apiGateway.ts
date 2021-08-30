import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import {ErrorTypes} from "../types";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
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

export const ErrorResponse = ( statusCode: ErrorTypes | number, message: string = '' ) => {
  const errorsMap = {
    [ErrorTypes.Err404]: 'Product is not found.',
    [ErrorTypes.Err500]: 'Something went wrong.',
  };
  return {
    statusCode,
    body: JSON.stringify({
      message: message || errorsMap[statusCode.toString()],
    }),
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
  }
}
