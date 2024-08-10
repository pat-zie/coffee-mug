export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly count: number,
  ) {}
}
