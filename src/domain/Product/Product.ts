import { Entity } from '../shared';
import { ProductValidator } from './Product.validator';

export class Product extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public stock: number,
  ) {
    super(id);
  }

  public restock(count: number): void {
    ProductValidator.validateStock(this.stock + count);
    this.stock += count;
  }

  public sell(count: number): void {
    ProductValidator.validateStock(this.stock - count);
    this.stock -= count;
  }
}
