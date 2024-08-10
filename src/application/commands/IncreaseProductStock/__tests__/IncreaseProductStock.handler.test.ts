import { generateProductFixture } from '../../../../__fixtures__';
import { ProductRepository } from '../../../../domain/Product';
import { InMemoryProductRepository } from '../../../../infrastructure/storage/Product';
import { InMemoryStorage } from '../../../../infrastructure/storage/shared';
import { IncreaseProductStockCommand } from '../IncreaseProductStock.command';
import { IncreaseProductStockHandler } from '../IncreaseProductStock.handler';

describe(IncreaseProductStockHandler.name, () => {
  let increaseProductStockHandler: IncreaseProductStockHandler;
  let storage: InMemoryStorage | null;
  let productRepository: ProductRepository;

  beforeEach(() => {
    storage = new InMemoryStorage();
    productRepository = new InMemoryProductRepository(storage);
    increaseProductStockHandler = new IncreaseProductStockHandler(productRepository);
  });

  describe(IncreaseProductStockHandler.prototype.handle.name, () => {
    it('handles the command', async () => {
      expect.assertions(1);

      // GIVEN
      const initialProductStock = 10;
      const product = generateProductFixture({ stock: initialProductStock });
      await productRepository.save(product);
      const addedStockCount = 3;
      const command = new IncreaseProductStockCommand(product.id, addedStockCount);

      // WHEN
      await increaseProductStockHandler.handle(command);

      // THEN
      const productAfter = await productRepository.retrieveById(product.id);
      expect(productAfter.stock).toBe(initialProductStock + addedStockCount);
    });
  });
});
