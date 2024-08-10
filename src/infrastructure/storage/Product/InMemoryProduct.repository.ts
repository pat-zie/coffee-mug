import { ProductRepository } from '../../../domain/Product';
import { Product } from '../../../domain/Product/Product';
import { NotFoundError } from '../../../shared/errors';
import { InMemoryStorage } from '../shared';

export class InMemoryProductRepository implements ProductRepository {
  constructor(
    private readonly storage: InMemoryStorage,
  ) {}

  async save(product: Product): Promise<void> {
    this.storage.products[product.id] = product;
  }

  async retrieveById(id: string): Promise<Product> {
    const product = this.storage.products[id];

    if (!product) {
      throw new NotFoundError(`Product with id ${id} does not exist`);
    }

    return product;
  }

  async findMany(): Promise<Product[]> {
    return Object.values(this.storage.products);
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const result: Product[] = [];
        
    for (const [id, value] of Object.entries(this.storage.products)) {
      if (ids.includes(id)) {
        result.push(value);
      }
    }

    return result;
  }
}
