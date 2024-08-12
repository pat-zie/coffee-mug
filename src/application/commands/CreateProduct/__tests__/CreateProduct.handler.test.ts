import { generateProductDtoFixture } from '../../../../__fixtures__';
import { ProductRepository } from '../../../../domain/Product';
import { InMemoryProductRepository } from '../../../../infrastructure/storage/Product';
import { InMemoryStorage } from '../../../../infrastructure/storage/shared';
import { uuidRegExp } from '../../../../shared';
import { CreateProductCommand } from '../CreateProduct.command';
import { CreateProductHandler } from '../CreateProduct.handler';

describe(CreateProductHandler.name, () => {
  let createProductHandler: CreateProductHandler;
  let storage: InMemoryStorage | null;
  let productRepository: ProductRepository;

  beforeEach(() => {
    storage = new InMemoryStorage();
    productRepository = new InMemoryProductRepository(storage);
    createProductHandler = new CreateProductHandler(productRepository);
  });

  describe(CreateProductHandler.prototype.handle.name, () => {
    it('handles the command', async () => {
      expect.assertions(3);

      // GIVEN
      const productDto = generateProductDtoFixture();
      const command = new CreateProductCommand(productDto);
      const productsBefore = await productRepository.findMany();

      // WHEN
      await createProductHandler.handle(command);

      // THEN
      expect(productsBefore.length).toBe(0);
      const productsAfter = await productRepository.findMany();
      expect(productsAfter.length).toBe(1);
      const [createdProduct] = productsAfter;
      expect(createdProduct).toEqual({
        description: productDto.description,
        id: expect.stringMatching(uuidRegExp),
        name: productDto.name,
        price: productDto.price,
        stock: productDto.stock,
      });
    });
  });
});
