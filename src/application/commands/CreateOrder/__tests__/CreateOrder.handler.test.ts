import { generateProductFixture } from '../../../../__fixtures__';
import { OrderDto, OrderRepository } from '../../../../domain/Order';
import { ProductRepository } from '../../../../domain/Product';
import { InMemoryOrderRepository } from '../../../../infrastructure/storage/Order';
import { InMemoryProductRepository } from '../../../../infrastructure/storage/Product';
import { InMemoryStorage } from '../../../../infrastructure/storage/shared';
import { Id, uuidRegExp } from '../../../../shared';
import { CreateOrderCommand } from '../CreateOrder.command';
import { CreateOrderHandler } from '../CreateOrder.handler';

describe(CreateOrderHandler.name, () => {
  let createOrderHandler: CreateOrderHandler;
  let storage: InMemoryStorage | null;
  let orderRepository: OrderRepository;
  let productRepository: ProductRepository;

  beforeEach(() => {
    storage = new InMemoryStorage();
    orderRepository = new InMemoryOrderRepository(storage);
    productRepository = new InMemoryProductRepository(storage);
    createOrderHandler = new CreateOrderHandler(orderRepository, productRepository);
  });

  describe(CreateOrderHandler.prototype.handle.name, () => {
    it('handles the command', async () => {
      expect.assertions(5);

      // GIVEN
      const product1Stock = 10;
      const product1 = generateProductFixture({ stock: product1Stock });
      const product2Stock = 5;
      const product2 = generateProductFixture({ stock: product2Stock });
      await productRepository.save(product1);
      await productRepository.save(product2);
      const customerId = Id.create();
      const product1OrderCount = 5;
      const product2OrderCount = 2;
      const orderDto: OrderDto = {
        customerId,
        itemList: [
          {
            productId: product1.id,
            count: product1OrderCount,
          },
          {
            productId: product2.id,
            count: product2OrderCount,
          },
        ],
      };
      const command = new CreateOrderCommand(orderDto);
      const ordersBefore = await orderRepository.findManyForCustomer(customerId);

      // WHEN
      await createOrderHandler.handle(command);

      // THEN
      expect(ordersBefore.length).toBe(0);
      const ordersAfter = await orderRepository.findManyForCustomer(customerId);
      expect(ordersAfter.length).toBe(1);
      const [createdOrder] = ordersAfter;
      expect(createdOrder).toEqual({
        customerId,
        id: expect.stringMatching(uuidRegExp),
        itemList: [
          {
            id: expect.stringMatching(uuidRegExp),
            count: product1OrderCount,
            productId: product1.id,
          },
          {
            id: expect.stringMatching(uuidRegExp),
            count: product2OrderCount,
            productId: product2.id,
          },
        ],
      });
      const product1After = await productRepository.retrieveById(product1.id);
      expect(product1After.stock).toBe(product1Stock - product1OrderCount);
      const product2After = await productRepository.retrieveById(product2.id);
      expect(product2After.stock).toBe(product2Stock - product2OrderCount);
    });
  });
});
