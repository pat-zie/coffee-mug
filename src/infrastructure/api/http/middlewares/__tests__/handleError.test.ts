import { mock } from 'jest-mock-extended';
import { Request, Response } from 'express';
import { HttpErrorStatusCode } from '../../shared';
import { handleError } from '../handleError';
import { BadRequestError, InternalServerError, NotFoundError, UnprocessableEntityError } from '../../../../../shared/errors';

interface TestCase {
  description: string,
  error: Error,
  expectedStatusCode: HttpErrorStatusCode,
  expectedMessage?: string,
}

describe(handleError.name, () => {
  const request = mock<Request>();
  const response = mock<Response>();
  const next = jest.fn();
  jest.spyOn(global.console, 'error').mockImplementation();

  afterEach(jest.clearAllMocks);

  const testCases: TestCase[] = [
    {
      description: BadRequestError.name,
      error: new BadRequestError('Bad request error'),
      expectedStatusCode: HttpErrorStatusCode.BadRequest,
    },
    { 
      description: NotFoundError.name,
      error: new NotFoundError('Not found error'),
      expectedStatusCode: HttpErrorStatusCode.NotFound,
    },
    { 
      description: UnprocessableEntityError.name,
      error: new UnprocessableEntityError('Unprocessable entity error'),
      expectedStatusCode: HttpErrorStatusCode.UnprocessableEntity,
    },
    { 
      description: InternalServerError.name,
      error: new InternalServerError('Something went wrong'),
      expectedStatusCode: HttpErrorStatusCode.InternalServer,
      expectedMessage: 'Internal Server Error',
    },
    { 
      description: Error.name,
      error: new Error('Something went wrong'),
      expectedStatusCode: HttpErrorStatusCode.InternalServer,
      expectedMessage: 'Internal Server Error',
    },
  ];

  test.each(testCases)('handles $description', ({ error, expectedMessage, expectedStatusCode }) => {
    // WHEN
    handleError(error, request, response, next);

    // THEN
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith({
      message: expectedMessage ?? error.message,
      statusCode: expectedStatusCode,
    });
  });
});
