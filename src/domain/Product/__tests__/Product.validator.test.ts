import { faker } from '@faker-js/faker';
import { MaxProductStringLength, ProductValidator } from '../Product.validator';
import { UnprocessableEntityError } from '../../../shared/errors';

describe(ProductValidator.name, () => {
  describe(ProductValidator.validateDescription.name, () => {
    it('does not throw an error when description is valid', () => {
      // GIVEN
      const description = faker.string.sample({ min: 1, max: MaxProductStringLength });

      // WHEN
      expect(() => ProductValidator.validateDescription(description))
      // THEN
        .not.toThrow();
    });

    it('throws an error when description is too long', () => {
      // GIVEN
      const description = faker.string.sample({ min: MaxProductStringLength + 1, max: MaxProductStringLength + 10 });

      // WHEN
      expect(() => ProductValidator.validateDescription(description))
      // THEN
        .toThrow(
          new UnprocessableEntityError(`Product description cannot be bigger than ${MaxProductStringLength}`),
        );
    });
  });

  describe(ProductValidator.validateName.name, () => {
    it('does not throw an error when name is valid', () => {
      // GIVEN
      const name = faker.string.sample({ min: 1, max: MaxProductStringLength });

      // WHEN
      expect(() => ProductValidator.validateName(name))
      // THEN
        .not.toThrow();
    });

    it('throws an error when name is too long', () => {
      // GIVEN
      const name = faker.string.sample({ min: MaxProductStringLength + 1, max: MaxProductStringLength + 10 });

      // WHEN
      expect(() => ProductValidator.validateName(name))
      // THEN
        .toThrow(
          new UnprocessableEntityError(`Product name cannot be bigger than ${MaxProductStringLength}`),
        );
    });
  });

  describe(ProductValidator.validatePrice.name, () => {
    it('does not throw an error when price is valid', () => {
      // GIVEN
      const price = faker.number.float({ min: 0.01 });

      // WHEN
      expect(() => ProductValidator.validatePrice(price))
      // THEN
        .not.toThrow();
    });

    it('throws an error when price is 0', () => {
      // GIVEN
      const price = 0;

      // WHEN
      expect(() => ProductValidator.validatePrice(price))
      // THEN
        .toThrow(
          new UnprocessableEntityError('Price has to be positive number'),
        );
    });

    it('throws an error when price is negative', () => {
      // GIVEN
      const price = -faker.number.float({ min: 0.01 });

      // WHEN
      expect(() => ProductValidator.validatePrice(price))
      // THEN
        .toThrow(
          new UnprocessableEntityError('Price has to be positive number'),
        );
    });
  });

  describe(ProductValidator.validateStock.name, () => {
    it('does not throw an error when stock is valid', () => {
      // GIVEN
      const stock = faker.number.int({ min: 0 });

      // WHEN
      expect(() => ProductValidator.validateStock(stock))
      // THEN
        .not.toThrow();
    });

    it('throws an error when stock is negative', () => {
      // GIVEN
      const stock = -faker.number.int({ min: 1 });

      // WHEN
      expect(() => ProductValidator.validateStock(stock))
      // THEN
        .toThrow(
          new UnprocessableEntityError('Stock level cannot be negative'),
        );
    });
  });
});
