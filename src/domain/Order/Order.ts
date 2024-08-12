import { NotFoundError } from '../../shared/errors';
import { OrderItem } from '../OrderItem';
import { Product } from '../Product';
import { Entity } from '../shared';

export class Order extends Entity {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly itemList: OrderItem[],
  ) {
    super(id);
  }

  public place(productList: Product[]): void {
    for (const item of this.itemList) {
      const productToSell = productList.find(product => product.id === item.productId);

      if (!productToSell) {
        throw new NotFoundError(`Product with id ${item.productId} does not exist`);
      }

      productToSell.sell(item.count);
    }
  }
}
