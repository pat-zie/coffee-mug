import { Db } from 'mongodb';
import { Product, ProductRepository } from '../../../domain/Product';
import { MongoProductDocument, MongoProductMapper } from './MongoProduct.mapper';
import { CollectionName } from '../shared/mongo';
import { NotFoundError } from '../../../shared/errors';

export class MongoProductRepository implements ProductRepository {
  constructor(
    private readonly storage: Db,
  ) {}

  async save(product: Product): Promise<void> {
    const document = MongoProductMapper.fromDomain(product);

    await this.storage
      .collection(CollectionName.Products)
      .updateOne({ id: product.id }, { $set: document }, { upsert: true });
  }

  async retrieveById(id: string): Promise<Product> {
    const document = await this.storage
      .collection<MongoProductDocument>(CollectionName.Products)
      .findOne({ id });

    if (!document) {
      throw new NotFoundError(`Product with id ${id} does not exist`);
    }

    return MongoProductMapper.toDomain(document);
  }
    
  async findManyByIds(ids: string[]): Promise<Product[]> {
    const documents = await this.storage
      .collection<MongoProductDocument>(CollectionName.Products)
      .find({ id: { $in: ids } }).toArray();

    return documents.map(document => MongoProductMapper.toDomain(document));
  }

  async findMany(): Promise<Product[]> {
    const documents = await this.storage
      .collection<MongoProductDocument>(CollectionName.Products)
      .find().toArray();

    return documents.map(document => MongoProductMapper.toDomain(document));
  }
}
