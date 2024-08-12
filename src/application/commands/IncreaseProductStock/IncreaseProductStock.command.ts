import { Command } from '../Command';

export class IncreaseProductStockCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly count: number,
  ) {}
}
