import { generateProductFixture } from '../../../../__fixtures__';
import { ProductRepository } from '../../../../domain/Product';
import { InMemoryProductRepository } from '../../../../infrastructure/storage/Product';
import { InMemoryStorage } from '../../../../infrastructure/storage/shared';
import { SellProductCommand } from '../SellProduct.command';
import { SellProductHandler } from '../SellProduct.handler';

describe(SellProductHandler.name, () => {
  let sellProductHandler: SellProductHandler;
  let storage: InMemoryStorage | null;
  let productRepository: ProductRepository;

  beforeEach(() => {
    storage = new InMemoryStorage();
    productRepository = new InMemoryProductRepository(storage);
    sellProductHandler = new SellProductHandler(productRepository);
  });

  describe(SellProductHandler.prototype.handle.name, () => {
    it('handles the command', async () => {
      expect.assertions(1);

      // GIVEN
      const initialProductStock = 10;
      const product = generateProductFixture({ stock: initialProductStock });
      await productRepository.save(product);
      const sellCount = 3;
      const command = new SellProductCommand(product.id, sellCount);

      // WHEN
      await sellProductHandler.handle(command);

      // THEN
      const productAfter = await productRepository.retrieveById(product.id);
      expect(productAfter.stock).toBe(initialProductStock - sellCount);
    });
  });
});
