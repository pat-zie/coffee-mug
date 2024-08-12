import { ObjectId } from 'mongodb';
import { Order } from '../../../domain/Order';

export interface MongoOrderDocument {
  // Decide what to do with native Mongo _id
  _id?: ObjectId;
  id: string;
  customerId: string;
  itemList: {
    id: string;
    productId: string;
    count: number;
  }[]
}

export class MongoOrderMapper {
  public static fromDomain(order: Order): MongoOrderDocument {
    return {
      id: order.id,
      customerId: order.customerId,
      itemList: order.itemList,
    };
  }

  public static toDomain(document: MongoOrderDocument): Order {
    return new Order(
      document.id,
      document.customerId,
      document.itemList,
    );
  }
}
