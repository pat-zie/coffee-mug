import { InternalServerError } from '../../shared/errors';
import { Query } from './Query';
import { QueryDispatcher } from './QueryDispatcher';
import { QueryHandler } from './QueryHandler';

// Response object could be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Response = any;

export class InMemoryQueryDispatcher implements QueryDispatcher {
  private handlers = new Map<string, QueryHandler<Query, Response>>();

  register<T extends Query, R>(commandName: string, handler: QueryHandler<T, R>): void {
    this.handlers.set(commandName, handler);
  }

  async dispatch<T>(query: Query): Promise<T> {
    const handler = this.handlers.get(query.constructor.name);

    if (!handler) {
      throw new InternalServerError(`Handler for query ${query.constructor.name} is not registered`);
    }

    return handler.handle(query);
  }
}
