import request from 'supertest';
import { faker } from '@faker-js/faker';
import { config } from '../config';
import { ApiPath, HttpSuccessStatusCode } from '../../shared';
import { HttpServer, ServerFactory } from '../../server';
import { ProductRepository } from '../../../../../domain/Product';
import { generateProductFixture } from '../../../../../__fixtures__';

describe(ApiPath.SellProduct, () => {
  let server: HttpServer;
  let cleanupDb: () => Promise<void>;
  let closeDb: () => Promise<void>;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const serverFactoryResult = await ServerFactory.create(config);
    server = serverFactoryResult.server;
    cleanupDb = serverFactoryResult.cleanupDb;
    closeDb = serverFactoryResult.closeDb;
    productRepository = server.get('ProductRepository');
  });

  afterEach(async () => {
    await cleanupDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  it('sells product', async () => {
    expect.assertions(2);

    // GIVEN
    const productBefore = generateProductFixture();
    const stockBefore = productBefore.stock;
    await productRepository.save(productBefore);
    const body = { count: faker.number.int({ max: productBefore.stock }) };

    // WHEN
    const response = await request(server)
      .post(ApiPath.SellProduct.replace(':id', productBefore.id))
      .send(body);

    // THEN
    expect(response.status).toBe(HttpSuccessStatusCode.NoContent);
    const productAfter = await productRepository.retrieveById(productBefore.id);
    expect(stockBefore - productAfter.stock).toBe(body.count);
  });
});
