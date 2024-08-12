import { Request, Response, NextFunction } from 'express';
import { HttpErrorStatusCode } from '../shared';
import { ErrorName } from '../../../../shared';

export interface ErrorBody {
  statusCode: HttpErrorStatusCode,
  message: string,
}

export const handleError = (error: Error, _: Request, response: Response, next: NextFunction) => {
  let errorBody: ErrorBody;

  if (error.name === ErrorName.BadRequest) {
    errorBody = {
      statusCode: HttpErrorStatusCode.BadRequest,
      message: error.message,
    };
  } else if (error.name === ErrorName.NotFound) {
    errorBody = {
      statusCode: HttpErrorStatusCode.NotFound,
      message: error.message,
    };
  } else if (error.name === ErrorName.UnprocessableEntity) {
    errorBody = {
      statusCode: HttpErrorStatusCode.UnprocessableEntity,
      message: error.message,
    };
  } else {
    errorBody = {
      statusCode: HttpErrorStatusCode.InternalServer,
      message: 'Internal Server Error',
    };
  }

  console.error(error);
  response.status(errorBody.statusCode);
  response.send(errorBody);
  next();
};
