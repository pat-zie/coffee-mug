import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { HttpRequestValidationKey } from '../shared';
import { BadRequestError } from '../../../../shared/errors';

export const validateRequest = (schema: Schema, validationKey: HttpRequestValidationKey) =>  {
  return (request: Request, _: Response, next: NextFunction) => {
    let value;

    switch (validationKey) {
      case HttpRequestValidationKey.Body:
        value = request.body;
        break;
      case HttpRequestValidationKey.Params:
        value = request.params;
        break;
      default: {
        next(new BadRequestError(`Unrecognized validation key ${validationKey}`));

        return;
      }
    }

    const validationResult = schema.validate(value);

    if (validationResult.error) {
      next(new BadRequestError(validationResult.error.message));

      return;
    }
        
    next();
  };
};
