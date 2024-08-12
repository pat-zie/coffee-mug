import { InMemoryCommandDispatcher } from './application/commands';
import { CreateOrderCommand, CreateOrderHandler } from './application/commands/CreateOrder';
import { CreateProductCommand, CreateProductHandler } from './application/commands/CreateProduct';
import { IncreaseProductStockCommand, IncreaseProductStockHandler } from './application/commands/IncreaseProductStock';
import { SellProductCommand, SellProductHandler } from './application/commands/SellProduct';
import { InMemoryQueryDispatcher } from './application/queries';
import { RetrieveProductListHandler, RetrieveProductListQuery } from './application/queries/RetrieveProductList';
import { Config } from './config';
import { OrderRepository } from './domain/Order';
import { ProductRepository } from './domain/Product';
import { OrderController } from './infrastructure/api/http/Order';
import { ProductController } from './infrastructure/api/http/Product';
import { InMemoryOrderRepository, MongoOrderRepository } from './infrastructure/storage/Order';
import { InMemoryProductRepository, MongoProductRepository } from './infrastructure/storage/Product';
import { InMemoryStorage, Storage } from './infrastructure/storage/shared';
import { MongoStorage } from './infrastructure/storage/shared/mongo';

export interface Application {
  product: ProductController,
  order: OrderController,
  dependencies: {
    productRepository: ProductRepository,
    orderRepository: OrderRepository,
    storage: Storage
  }
}

interface StorageDependencies {
  productRepository: ProductRepository,
  orderRepository: OrderRepository,
  storage: Storage,
}

export class ApplicationFactory {
  public static async create(config: Config): Promise<Application> {
    const {
      storage,
      productRepository,
      orderRepository,
    } = await ApplicationFactory.getStorageRepositories(config);
    
    const commandDispatcher = new InMemoryCommandDispatcher();
    const createOrderHandler = new CreateOrderHandler(orderRepository, productRepository);
    const createProductHandler = new CreateProductHandler(productRepository);
    const increaseProductStockHandler = new IncreaseProductStockHandler(productRepository);
    const sellProductHandler = new SellProductHandler(productRepository);
    commandDispatcher.register(CreateOrderCommand.name, createOrderHandler);
    commandDispatcher.register(CreateProductCommand.name, createProductHandler);
    commandDispatcher.register(IncreaseProductStockCommand.name, increaseProductStockHandler);
    commandDispatcher.register(SellProductCommand.name, sellProductHandler);
        
    const queryDispatcher = new InMemoryQueryDispatcher();
    const retrieveProductListHandler = new RetrieveProductListHandler(productRepository);
    queryDispatcher.register(RetrieveProductListQuery.name, retrieveProductListHandler);
        
    const productController = new ProductController(commandDispatcher, queryDispatcher);
    const orderController = new OrderController(commandDispatcher);
    
    return {
      product: productController,
      order: orderController,
      dependencies: {
        orderRepository,
        productRepository,
        storage,
      },
    };
  }

  private static async getStorageRepositories(config: Config): Promise<StorageDependencies> {
    if (config.shouldUseInMemoryDb) {
      const storage = new InMemoryStorage();

      return {
        storage,
        productRepository: new InMemoryProductRepository(storage),
        orderRepository: new InMemoryOrderRepository(storage),
      };
    } else {
      const storage = new MongoStorage(config.dbConnectionString, config.dbName);
      const connectedStorage = await storage.connect();

      return {
        storage,
        productRepository: new MongoProductRepository(connectedStorage),
        orderRepository: new MongoOrderRepository(connectedStorage),
      };
    }
  }
}
