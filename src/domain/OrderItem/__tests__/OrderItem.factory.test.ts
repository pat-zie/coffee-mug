import { generateOrderItemDtoFixture } from '../../../__fixtures__';
import { uuidRegExp } from '../../../shared';
import { OrderItem } from '../OrderItem';
import { OrderItemFactory } from '../OrderItem.factory';

describe(OrderItemFactory.name, () => {
  describe(OrderItemFactory.create.name, () => {
    it('creates order item instance', () => {
      // GIVEN
      const dto = generateOrderItemDtoFixture();

      // WHEN
      const result = OrderItemFactory.create(dto);

      // THEN
      expect(result).toBeInstanceOf(OrderItem);
      expect(result).toEqual({
        id: expect.stringMatching(uuidRegExp),
        productId: dto.productId,
        count: dto.count,
      });
    });
  });
});
