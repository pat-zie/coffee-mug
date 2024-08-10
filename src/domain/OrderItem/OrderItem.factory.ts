import { Id } from '../../shared';
import { OrderItem } from './OrderItem';
import { OrderItemDto } from './OrderItem.dto';

export class OrderItemFactory {
  public static create(orderItemDto: OrderItemDto): OrderItem {
    return new OrderItem(
      Id.create(),
      orderItemDto.productId,
      orderItemDto.count,
    );
  }
}
