import { faker } from '@faker-js/faker';
import { Product, ProductDto, ProductFactory } from '../domain/Product';

export const generateProductDtoFixture = (overrides: Partial<ProductDto> = {}): ProductDto => ({
  description: faker.lorem.word(),
  name: faker.lorem.words(1),
  price: faker.number.float(),
  stock: faker.number.int(),
  ...overrides,
});

export const generateProductFixture = (overrides: Partial<ProductDto> = {}): Product => ProductFactory.create({
  ...generateProductDtoFixture(),
  ...overrides,
});
