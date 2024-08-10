import { generateProductFixture } from '../../../../../__fixtures__';
import { ProductListResponseMapper } from '../ProductList.mapper';

describe(ProductListResponseMapper.name, () => {
  describe(ProductListResponseMapper.fromDomain.name, () => {
    it('maps products to response', () => {
      // GIVEN
      const product1 = generateProductFixture();
      const product2 = generateProductFixture();
      const products = [product1, product2];

      // WHEN
      const result = ProductListResponseMapper.fromDomain(products);

      // THEN
      expect(result.count).toBe(2);
      expect(result.itemList).toContainEqual({
        id: product1.id,
        name: product1.name,
        description: product1.description,
        price: product1.price,
        stock: product1.stock,
      });
      expect(result.itemList).toContainEqual({
        id: product2.id,
        name: product2.name,
        description: product2.description,
        price: product2.price,
        stock: product2.stock,
      });
    });
  });
});
