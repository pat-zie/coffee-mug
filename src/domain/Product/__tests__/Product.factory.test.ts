import { generateProductDtoFixture } from '../../../__fixtures__';
import { uuidRegExp } from '../../../shared';
import { Product } from '../Product';
import { ProductFactory } from '../Product.factory';

describe(ProductFactory.name, () => {
  describe(ProductFactory.create.name, () => {
    it('creates product instance', () => {
      // GIVEN
      const dto = generateProductDtoFixture();

      // WHEN
      const result = ProductFactory.create(dto);

      // THEN
      expect(result).toBeInstanceOf(Product);
      expect(result).toEqual({
        id: expect.stringMatching(uuidRegExp),
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
      });
    });

    it('throws an error when validation failed', () => {
      // GIVEN
      const dto = generateProductDtoFixture({ price: -1.0 });

      // WHEN
      expect(() => ProductFactory.create(dto))
      // THEN
        .toThrow();
    });
  });
});
