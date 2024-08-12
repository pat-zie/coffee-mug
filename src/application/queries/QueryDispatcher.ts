import { Query } from './Query';
import { QueryHandler } from './QueryHandler';

export interface QueryDispatcher {
  register<T extends Query, R>(queryName: string, handler: QueryHandler<T, R>): void;
  dispatch<T>(query: Query): Promise<T>;
}
