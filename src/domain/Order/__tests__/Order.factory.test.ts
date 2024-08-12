import { generateOrderDtoFixture } from '../../../__fixtures__';
import { uuidRegExp } from '../../../shared';
import { Order } from '../Order';
import { OrderFactory } from '../Order.factory';

describe(OrderFactory.name, () => {
  describe(OrderFactory.create.name, () => {
    it('creates order instance', () => {
      // GIVEN
      const dto = generateOrderDtoFixture();

      // WHEN
      const result = OrderFactory.create(dto);

      // THEN
      expect(result).toBeInstanceOf(Order);
      expect(result).toEqual({
        customerId: dto.customerId,
        id: expect.stringMatching(uuidRegExp),
        itemList: [
          {
            id: expect.stringMatching(uuidRegExp),
            count: dto.itemList[0].count,
            productId: dto.itemList[0].productId,
          },
          {
            id: expect.stringMatching(uuidRegExp),
            count: dto.itemList[1].count,
            productId: dto.itemList[1].productId,
          },
        ],
      });
    });
  });
});
