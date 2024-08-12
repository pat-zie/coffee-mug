import { faker } from '@faker-js/faker';
import { Product } from '../Product';
import { ProductFactory } from '../Product.factory';
import { generateProductDtoFixture } from '../../../__fixtures__';
import { UnprocessableEntityError } from '../../../shared/errors';

describe(Product.name, () => {
  describe(Product.prototype.restock.name, () => {
    it('adds supplied stock value to existing stock level', () => {
      // GIVEN
      const initialStockCount = faker.number.int();
      const order = ProductFactory.create(
        generateProductDtoFixture({ stock: initialStockCount }),
      );
      const stockCount = initialStockCount - 1;

      // WHEN
      order.restock(stockCount);

      // THEN
      expect(order.stock).toBe(initialStockCount + stockCount);
    });

    it('subtracts supplied stock value from existing stock level when the value is negative', () => {
      // GIVEN
      const initialStockCount = faker.number.int();
      const order = ProductFactory.create(
        generateProductDtoFixture({ stock: initialStockCount }),
      );
      const stockCount = -(initialStockCount - 1);

      // WHEN
      order.restock(stockCount);

      // THEN
      expect(order.stock).toBe(initialStockCount + stockCount);
    });

    it('throws an error when supplied negative stock value cause negative stock level', () => {
      // GIVEN
      const initialStockCount = faker.number.int();
      const order = ProductFactory.create(
        generateProductDtoFixture({ stock: initialStockCount }),
      );
      const stockCount = -(initialStockCount + 1);

      // WHEN
      expect(() => order.restock(stockCount))
      // THEN
        .toThrow(
          new UnprocessableEntityError('Stock level cannot be negative'),
        );
    });
  });

  describe(Product.prototype.sell.name, () => {
    it('subtracts supplied sell count from stock level', () => {
      // GIVEN
      const initialStockCount = faker.number.int();
      const order = ProductFactory.create(
        generateProductDtoFixture({ stock: initialStockCount }),
      );
      const sellCount = initialStockCount - 1;

      // WHEN
      order.sell(sellCount);

      // THEN 
      expect(order.stock).toBe(initialStockCount - sellCount);
    });

    it('throws an error when sell count is bigger than stock count', () => {
      // GIVEN
      const initialStockCount = faker.number.int();
      const order = ProductFactory.create(
        generateProductDtoFixture({ stock: initialStockCount }),
      );
      const stockCount = initialStockCount + 1;

      // WHEN
      expect(() => order.sell(stockCount))
      // THEN
        .toThrow(
          new UnprocessableEntityError('Stock level cannot be negative'),
        );
    });
  });
});
