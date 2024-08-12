import { Command } from '../Command';

export class SellProductCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly count: number,
  ) {}
}
