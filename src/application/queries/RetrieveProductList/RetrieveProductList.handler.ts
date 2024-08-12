import { Product, ProductRepository } from '../../../domain/Product';
import { QueryHandler } from '../QueryHandler';
import { RetrieveProductListQuery } from './RetrieveProductList.query';

export class RetrieveProductListHandler implements QueryHandler<RetrieveProductListQuery, Promise<Product[]>>  {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async handle(): Promise<Product[]> {
    return this.productRepository.findMany();
  }
}
