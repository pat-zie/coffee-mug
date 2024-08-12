import request from 'supertest';
import { config } from '../config';
import { ApiPath, HttpSuccessStatusCode } from '../../shared';
import { HttpServer, ServerFactory } from '../../server';
import { ProductRepository } from '../../../../../domain/Product';
import { generateProductFixture } from '../../../../../__fixtures__';

describe(ApiPath.RetrieveProductList, () => {
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

  it('retrieves product list', async () => {
    expect.assertions(4);

    // GIVEN
    const product1 = generateProductFixture();
    const product2 = generateProductFixture();
    await productRepository.save(product1);
    await productRepository.save(product2);

    // WHEN
    const response = await request(server)
      .get(ApiPath.RetrieveProductList);

    // THEN
    expect(response.status).toBe(HttpSuccessStatusCode.Ok);
    expect(response.body.count).toBe(2);
    expect(response.body.itemList).toContainEqual({
      id: product1.id,
      name: product1.name,
      description: product1.description,
      price: product1.price,
      stock: product1.stock,
    });
    expect(response.body.itemList).toContainEqual({
      id: product2.id,
      name: product2.name,
      description: product2.description,
      price: product2.price,
      stock: product2.stock,
    });
  });
});
