import { Query } from './Query';

export interface QueryHandler<T extends Query, R> {
  handle(query: T): R
}
