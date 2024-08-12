import { faker } from '@faker-js/faker';
import { Order, OrderDto, OrderFactory } from '../domain/Order';

export const generateOrderDtoFixture = (overrides: Partial<OrderDto> = {}): OrderDto => ({
  customerId: faker.string.uuid(),
  itemList: [
    {
      productId: faker.string.uuid(),
      count: faker.number.int(),
    },
    {
      productId: faker.string.uuid(),
      count: faker.number.int(),
    },
  ],
  ...overrides,
});

export const generateOrderFixture = (overrides: Partial<OrderDto> = {}): Order => OrderFactory.create({
  ...generateOrderDtoFixture(),
  ...overrides,
});
