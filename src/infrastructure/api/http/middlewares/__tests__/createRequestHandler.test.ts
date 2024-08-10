import { mock } from 'jest-mock-extended';
import { Request, Response } from 'express';
import { createRequestHandler } from '../createRequestHandler';
import { InternalServerError } from '../../../../../shared/errors';

const fn = jest.fn();

describe(createRequestHandler.name, () => {
  const request = mock<Request>();
  const response = mock<Response>();
  const next = jest.fn();

  afterEach(jest.clearAllMocks);

  it('creates and performs request handler', async () => {
    expect.assertions(3);

    // GIVEN
    const requestHandler = createRequestHandler(fn);

    // WHEN
    await requestHandler(request, response, next);

    // THEN
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(request, response, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('passes an error in next function', async () => {
    expect.assertions(2);

    // GIVEN
    const requestHandler = createRequestHandler(fn);
    const error = new InternalServerError('Something went wrong');
    fn.mockRejectedValueOnce(error);

    // WHEN
    await requestHandler(request, response, next);

    // THEN
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });
});
