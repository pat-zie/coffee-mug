import { Order } from '../../../domain/Order';
import { Product } from '../../../domain/Product';
import { Storage } from './Storage';

export class InMemoryStorage implements Storage {
  public readonly orders: Record<string, Order> = {};

  public readonly products: Record<string, Product> = {};

  cleanupDb(): Promise<void> {
    return Promise.resolve();
  }

  closeDb(): Promise<void> {
    return Promise.resolve();
  }
}
