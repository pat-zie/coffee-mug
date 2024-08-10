import { OrderItemDto } from '../OrderItem';

export interface OrderDto {
  customerId: string,
  itemList: OrderItemDto[],
}
