import { Request, Response } from 'express';
import { CommandDispatcher } from '../../../../application/commands';
import { HttpSuccessStatusCode } from '../shared';
import { CreateOrderCommand } from '../../../../application/commands/CreateOrder';

export class OrderController {
  constructor(
    private readonly commandDispatcher: CommandDispatcher,
  ) {}

  async create(request: Request, response: Response) {
    const { customerId, itemList } = request.body;
    await this.commandDispatcher.dispatch(
      new CreateOrderCommand({
        customerId,
        itemList,
      }),
    );
    response
      .status(HttpSuccessStatusCode.NoContent)
      .send();
  }
}
