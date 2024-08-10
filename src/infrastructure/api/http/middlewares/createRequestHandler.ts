import { Request, Response, NextFunction } from 'express';

export const createRequestHandler = (fn: (request: Request, response: Response, next: NextFunction) => Promise<void>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await fn(request, response, next);
      next();
    } catch (error) {
      next(error);
    }
  };
};
