import { OrderFactory, OrderRepository } from '../../../domain/Order';
import { ProductRepository } from '../../../domain/Product';
import { CommandHandler } from '../CommandHandler';
import { CreateOrderCommand } from './CreateOrder.command';

export class CreateOrderHandler implements CommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  public async handle(command: CreateOrderCommand): Promise<void> {
    const productIdList = command.orderDto.itemList.map(item => item.productId);
    const productList = await this.productRepository.findManyByIds(productIdList);
    const order = OrderFactory.create(command.orderDto);
    order.place(productList);
    await this.orderRepository.saveWithProductList(order, productList);
  }
}
