import { generateOrderDtoFixture, generateProductFixture } from '../../../__fixtures__';
import { Id } from '../../../shared';
import { NotFoundError } from '../../../shared/errors';
import { Order } from '../Order';
import { OrderFactory } from '../Order.factory';

describe(Order.name, () => {
  describe(Order.prototype.place.name, () => {
    it('places an order', () => {
      // GIVEN
      const product1InitialStock = 10;
      const product1 = generateProductFixture({ stock: product1InitialStock });
      const product2InitialStock = 20;
      const product2 = generateProductFixture({ stock: product2InitialStock });
      const products = [product1, product2];
      const product1SellCount = 5;
      const product2SellCount = 10;
      const orderDto = generateOrderDtoFixture({
        itemList: [
          {
            productId: product1.id,
            count: product1SellCount,
          },
          {
            productId: product2.id,
            count: product2SellCount,
          },
        ],
      });
      const order = OrderFactory.create(orderDto);

      // WHEN
      order.place(products);

      // THEN
      expect(product1.stock).toBe(product1InitialStock - product1SellCount);
      expect(product2.stock).toBe(product2InitialStock - product2SellCount);
    });

    it('throws an error when product does not exist', () => {
      // GIVEN
      const product = generateProductFixture();
      const products = [product];
      const notExistingProductId = Id.create();
      const orderDto = generateOrderDtoFixture({
        itemList: [
          {
            productId: notExistingProductId,
            count: 1,
          },
        ],
      });
      const order = OrderFactory.create(orderDto);

      // WHEN
      expect(() => order.place(products))
      // THEN
        .toThrow(
          new NotFoundError(`Product with id ${notExistingProductId} does not exist`),
        );
    });
  });
});
