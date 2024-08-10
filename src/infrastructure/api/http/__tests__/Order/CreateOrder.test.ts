import request from 'supertest';
import { faker } from '@faker-js/faker';
import { ApiPath, HttpSuccessStatusCode } from '../../shared';
import { HttpServer, ServerFactory } from '../../server';
import { ProductRepository } from '../../../../../domain/Product';
import { OrderRepository } from '../../../../../domain/Order';
import { config } from '../config';
import { generateOrderDtoFixture, generateProductFixture } from '../../../../../__fixtures__';
import { uuidRegExp } from '../../../../../shared';

describe(ApiPath.CreateOrder, () => {
  let server: HttpServer;
  let cleanupDb: () => Promise<void>;
  let closeDb: () => Promise<void>;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const serverFactoryResult = await ServerFactory.create(config);
    server = serverFactoryResult.server;
    cleanupDb = serverFactoryResult.cleanupDb;
    closeDb = serverFactoryResult.closeDb;
    productRepository = server.get('ProductRepository');
    orderRepository = server.get('OrderRepository');
  });

  afterEach(async () => {
    await cleanupDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  it('creates order', async () => {
    expect.assertions(10);

    // GIVEN
    const ordersBefore = await orderRepository.findMany();
    const product1 = generateProductFixture();
    const stock1Before = product1.stock;
    const product2 = generateProductFixture();
    const stock2Before = product2.stock;
    const product3 = generateProductFixture();
    const stock3Before = product3.stock;
    await productRepository.save(product1);
    await productRepository.save(product2);
    await productRepository.save(product3);
    const body = generateOrderDtoFixture({
      itemList: [
        {
          productId: product1.id,
          count: faker.number.int({ max: product1.stock }),
        },
        {
          productId: product3.id,
          count: faker.number.int({ max: product3.stock }),
        },
      ],
    });

    // WHEN
    const response = await request(server)
      .post(ApiPath.CreateOrder)
      .send(body);

    // THEN
    expect(response.status).toBe(HttpSuccessStatusCode.NoContent);
    expect(ordersBefore.length).toBe(0);
    const ordersAfter = await orderRepository.findMany();
    expect(ordersAfter.length).toBe(1);
    const [createdOrder] = ordersAfter;
    expect(createdOrder).toEqual(
      expect.objectContaining({
        customerId: body.customerId,
        id: expect.stringMatching(uuidRegExp),
      }),
    );
    expect(createdOrder.itemList.length).toBe(2);
    expect(createdOrder.itemList).toContainEqual({
      id: expect.stringMatching(uuidRegExp),
      productId: body.itemList[0].productId,
      count: body.itemList[0].count,
    });
    expect(createdOrder.itemList).toContainEqual({
      id: expect.stringMatching(uuidRegExp),
      productId: body.itemList[1].productId,
      count: body.itemList[1].count,
    });
    const product1After = await productRepository.retrieveById(product1.id);
    expect(product1After.stock).toBe(stock1Before - body.itemList[0].count);
    const product2After = await productRepository.retrieveById(product2.id);
    expect(product2After.stock).toBe(stock2Before);
    const product3After = await productRepository.retrieveById(product3.id);
    expect(product3After.stock).toBe(stock3Before - body.itemList[1].count);
  });
});
