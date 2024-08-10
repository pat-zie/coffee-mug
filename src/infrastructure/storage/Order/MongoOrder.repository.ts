import { Db } from 'mongodb';
import { Order, OrderRepository } from '../../../domain/Order';
import { MongoOrderDocument, MongoOrderMapper } from './MongoProduct.mapper';
import { CollectionName } from '../shared/mongo';
import { Product } from '../../../domain/Product';
import { MongoProductMapper } from '../Product';

export class MongoOrderRepository implements OrderRepository {
  constructor(
    private readonly storage: Db,
  ) {}

  async save(order: Order): Promise<void> {
    const document = MongoOrderMapper.fromDomain(order);

    await this.storage
      .collection(CollectionName.Orders)
      .updateOne({ id: order.id }, { $set: document }, { upsert: true });
  }

  async saveWithProductList(order: Order, productList: Product[]): Promise<void> {
    // Configure Mongo replica set to use transaction
    await this.save(order);

    await Promise.all(
      productList.map(async (product) => {
        const document = MongoProductMapper.fromDomain(product);

        return this.storage
          .collection(CollectionName.Products)
          .updateOne({ id: product.id }, { $set: document }, { upsert: true });
      }),
    );
  }

  async findManyForCustomer(customerId: string): Promise<Order[]> {
    const result = await this.storage
      .collection(CollectionName.Orders)
      .find({ customerId });

    return result as unknown as Order[];
  }

  async findMany(): Promise<Order[]> {
    const documents = await this.storage
      .collection<MongoOrderDocument>(CollectionName.Orders)
      .find().toArray();

    return documents.map(document => MongoOrderMapper.toDomain(document));
  }
}
