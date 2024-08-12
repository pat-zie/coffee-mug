import { OrderDto } from '../../../domain/Order';
import { Command } from '../Command';

export class CreateOrderCommand implements Command {
  constructor(
    public readonly orderDto: OrderDto,
  ) {}
}
