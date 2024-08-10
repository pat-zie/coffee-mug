import { Product } from '../Product';
import { Repository } from '../shared';
import { Order } from './Order';

export interface OrderRepository extends Repository<Order> {
  findManyForCustomer(customerId: string): Promise<Order[]>
  saveWithProductList(order: Order, productList: Product[]): Promise<void>
}
