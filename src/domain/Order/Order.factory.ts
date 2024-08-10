import { Id } from '../../shared';
import { OrderItemFactory } from '../OrderItem';
import { Order } from './Order';
import { OrderDto } from './Order.dto';

export class OrderFactory {
  public static create(orderDto: OrderDto): Order {
    const orderItemList = orderDto.itemList.map(
      item => OrderItemFactory.create(item),
    );

    return new Order(
      Id.create(),
      orderDto.customerId,
      orderItemList,
    );
  }    
}
