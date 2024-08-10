import { Order, OrderRepository } from '../../../domain/Order';
import { Product } from '../../../domain/Product';
import { InMemoryStorage } from '../shared';

export class InMemoryOrderRepository implements OrderRepository {
  constructor(
    private readonly storage: InMemoryStorage,
  ) {}

  async save(order: Order): Promise<void> {
    this.storage.orders[order.id] = order;
  }

  async saveWithProductList(order: Order, productList: Product[]): Promise<void> {
    await this.save(order);

    for (const product of productList) {
      this.storage.products[product.id] = product;
    }
  }

  async findMany(): Promise<Order[]> {
    return Object.values(this.storage.orders);
  }

  async findManyForCustomer(customerId: string): Promise<Order[]> {
    return Object.values(this.storage.orders).filter(
      order => order.customerId === customerId,
    );
  }
}
