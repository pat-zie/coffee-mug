import { Entity } from './Entity';

export interface Repository<T extends Entity> {
  save(entity: T): Promise<void>;
  findMany(): Promise<T[]>;
}
