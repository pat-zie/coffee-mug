import request from 'supertest';
import { ApiPath, HttpSuccessStatusCode } from '../../shared';
import { HttpServer, ServerFactory } from '../../server';
import { ProductRepository } from '../../../../../domain/Product';
import { config } from '../config';
import { generateProductDtoFixture } from '../../../../../__fixtures__';
import { uuidRegExp } from '../../../../../shared';

describe(ApiPath.CreateProduct, () => {
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

  it('creates product', async () => {
    expect.assertions(4);

    // GIVEN
    const body = generateProductDtoFixture();
    const productsBefore = await productRepository.findMany();

    // WHEN
    const response = await request(server)
      .post(ApiPath.CreateProduct)
      .send(body);

    // THEN
    expect(response.status).toBe(HttpSuccessStatusCode.NoContent);
    expect(productsBefore.length).toBe(0);
    const productsAfter = await productRepository.findMany();
    expect(productsAfter.length).toBe(1);
    const [createdProduct] = productsAfter;
    expect(createdProduct).toEqual({
      id: expect.stringMatching(uuidRegExp),
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
    });
  });
});
