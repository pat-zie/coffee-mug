import { generateProductFixture } from '../../../../__fixtures__';
import { ProductRepository } from '../../../../domain/Product';
import { InMemoryProductRepository } from '../../../../infrastructure/storage/Product';
import { InMemoryStorage } from '../../../../infrastructure/storage/shared';
import { RetrieveProductListHandler } from '../RetrieveProductList.handler';

describe(RetrieveProductListHandler.name, () => {
  let retrieveProductListHandler: RetrieveProductListHandler;
  let storage: InMemoryStorage | null;
  let productRepository: ProductRepository;

  beforeEach(() => {
    storage = new InMemoryStorage();
    productRepository = new InMemoryProductRepository(storage);
    retrieveProductListHandler = new RetrieveProductListHandler(productRepository);
  });

  describe(RetrieveProductListHandler.prototype.handle.name, () => {
    it('handles the command', async () => {
      expect.assertions(3);

      // GIVEN
      const product1 = generateProductFixture();
      const product2 = generateProductFixture();
      await productRepository.save(product1);
      await productRepository.save(product2);
            
      // WHEN
      const result = await retrieveProductListHandler.handle();

      // THEN
      expect(result.length).toBe(2);
      expect(result).toContainEqual({
        id: product1.id,
        name: product1.name,
        description: product1.description,
        price: product1.price,
        stock: product1.stock,
      });
      expect(result).toContainEqual({
        id: product2.id,
        name: product2.name,
        description: product2.description,
        price: product2.price,
        stock: product2.stock,
      });
    });
  });
});
