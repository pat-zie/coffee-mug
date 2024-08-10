import express, { Express } from 'express';
import consolidate from 'consolidate';
import path from 'path';
import { Config } from '../../../../config';
import { ApplicationFactory } from '../../../../Application.factory';
import { ApiPath, HttpRequestValidationKey } from '../shared';
import { createRequestHandler, handleError, validateRequest } from '../middlewares';
import { CreateOrderBodySchema } from '../Order';
import { createDocumentation } from '../documentation';
import {
  CreateProductBodySchema,
  RestockProductBodySchema,
  RestockProductParamsSchema,
  SellProductBodySchema,
  SellProductParamsSchema,
} from '../Product';

const router = express.Router();

export type HttpServer = Express;
export interface ServerFactoryResult {
  server: HttpServer,
  cleanupDb: () => Promise<void>,
  closeDb: () => Promise<void>,
}

export class ServerFactory {
  public static async create(config: Config): Promise<ServerFactoryResult> {
    const application = await ApplicationFactory.create(config);

    const server = express();

    server.use(express.json());
    server.engine('hjs', consolidate.handlebars);
    server.set('view engine', 'hjs');
    server.use(express.static(path.join(__dirname, '../../../../../../', 'views')));
    server.use(createDocumentation(config.host));

    router.get(
      ApiPath.RetrieveProductList,
      createRequestHandler((request, response) => application.product.retrieveList(request, response)),
    );
    router.post(
      ApiPath.CreateProduct,
      [
        validateRequest(CreateProductBodySchema, HttpRequestValidationKey.Body),
      ],
      createRequestHandler((request, response) => application.product.create(request, response)),
    );
    router.post(
      ApiPath.RestockProduct,
      [
        validateRequest(RestockProductParamsSchema, HttpRequestValidationKey.Params),
        validateRequest(RestockProductBodySchema, HttpRequestValidationKey.Body),
      ],
      createRequestHandler((request, response) => application.product.restock(request, response)),
    );
    router.post(
      ApiPath.SellProduct,
      [
        validateRequest(SellProductParamsSchema, HttpRequestValidationKey.Params),
        validateRequest(SellProductBodySchema, HttpRequestValidationKey.Body),
      ],
      createRequestHandler((request, response) => application.product.sell(request, response)),
    );
    router.post(
      ApiPath.CreateOrder,
      [
        validateRequest(CreateOrderBodySchema, HttpRequestValidationKey.Body),
      ],
      createRequestHandler((request, response) => application.order.create(request, response)),
    );
    server.use(router);
    server.use(handleError);
        
    server.set('ProductRepository', application.dependencies.productRepository);
    server.set('OrderRepository', application.dependencies.orderRepository);

    return {
      server,
      cleanupDb: async () => {
        await application.dependencies.storage.cleanupDb();
      },
      closeDb: async () => {
        await application.dependencies.storage.closeDb();
      },
    };
  }
}
