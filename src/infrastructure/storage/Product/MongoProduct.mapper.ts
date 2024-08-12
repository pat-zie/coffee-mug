import { ObjectId } from 'mongodb';
import { Product } from '../../../domain/Product';

export interface MongoProductDocument {
  // Decide what to do with native Mongo _id
  _id?: ObjectId
  name: string,
  description: string,
  id: string,
  price: number,
  stock: number,
}

export class MongoProductMapper {
  public static fromDomain(product: Product): MongoProductDocument {
    return {
      description: product.description,
      name: product.name,
      id: product.id,
      price: product.price,
      stock: product.stock,
    };
  }

  public static toDomain(document: MongoProductDocument): Product {
    return new Product(
      document.id,
      document.name,
      document.description,
      document.price,
      document.stock,
    );
  }
}
