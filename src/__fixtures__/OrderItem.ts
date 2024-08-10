import { faker } from '@faker-js/faker';
import { OrderItem, OrderItemDto, OrderItemFactory } from '../domain/OrderItem';

export const generateOrderItemDtoFixture = (overrides: Partial<OrderItemDto> = {}): OrderItemDto => ({
  count: faker.number.int(),
  productId: faker.string.uuid(),
  ...overrides,
});

export const generateOrderItemFixture = (overrides: Partial<OrderItem> = {}): OrderItem => OrderItemFactory.create({
  ...generateOrderItemDtoFixture(),
  ...overrides,
});
