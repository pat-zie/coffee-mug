import { Product } from './Product';
import { Repository } from '../shared';

export interface ProductRepository extends Repository<Product> {
  retrieveById(id: string): Promise<Product>;
  findManyByIds(ids: string[]): Promise<Product[]>;
}
