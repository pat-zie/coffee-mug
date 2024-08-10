import Joi from 'joi';
import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import { validateRequest } from '../validateRequest';
import { HttpRequestValidationKey } from '../../shared';
import { BadRequestError } from '../../../../../shared/errors';

const TestSchema = Joi.object({
  test: Joi.number().integer().required(),
});

describe(validateRequest.name, () => {
  const request = mock<Request>();
  const response = mock<Response>();
  const next = jest.fn();

  afterEach(jest.clearAllMocks);

  it('validates request successfully', () => {
    // GIVEN
    request.body = { test: faker.number.int() };
        
    // WHEN
    validateRequest(TestSchema, HttpRequestValidationKey.Body)(request, response, next);

    // THEN
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  describe('call next function with error', () => {
    it('when request is not valid', () => {
      // GIVEN
      request.body = { test: faker.lorem.word() };
            
      // WHEN
      validateRequest(TestSchema, HttpRequestValidationKey.Body)(request, response, next);

      // THEN
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new BadRequestError('"test" must be a number'));
    });

    it('when validation key is malformed', () => {
      // GIVEN
      const malformedKey = 'malformed-key' as HttpRequestValidationKey;
      request.body = { test: faker.number.int() };
            
      // WHEN
      validateRequest(TestSchema, malformedKey)(request, response, next);

      // THEN
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new BadRequestError(`Unrecognized validation key ${malformedKey}`));
    });
  });
});
