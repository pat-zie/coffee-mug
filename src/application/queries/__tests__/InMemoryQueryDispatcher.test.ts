import { mock } from 'jest-mock-extended';
import { Query } from '../Query';
import { InMemoryQueryDispatcher } from '../InMemoryQueryDispatcher';
import { QueryHandler } from '../QueryHandler';
import { InternalServerError } from '../../../shared/errors';

class TestQuery implements Query {}

describe(InMemoryQueryDispatcher.name, () => {
  let inMemoryQueryDispatcher: InMemoryQueryDispatcher;

  beforeEach(() => {
    inMemoryQueryDispatcher = new InMemoryQueryDispatcher();
  });

  it('registers and dispatches a query', async () => {
    expect.assertions(3);

    // GIVEN
    const query = new TestQuery();
    const queryName = query.constructor.name;
    const queryHandler = mock<QueryHandler<TestQuery, Promise<string>>>();
    const queryHandlerResult = 'test-query-handler-result';
    queryHandler.handle.mockResolvedValueOnce(queryHandlerResult);

    // WHEN
    inMemoryQueryDispatcher.register(queryName, queryHandler);
    const result = await inMemoryQueryDispatcher.dispatch(query);

    // THEN
    expect(result).toBe(queryHandlerResult);
    expect(queryHandler.handle).toHaveBeenCalledTimes(1);
    expect(queryHandler.handle).toHaveBeenCalledWith(query);
  });

  it('throws an error when query handler is not registered', async () => {
    expect.assertions(1);
        
    // GIVEN
    const query = new TestQuery();

    // WHEN
    await expect(inMemoryQueryDispatcher.dispatch(query))
    // THEN
      .rejects.toThrow(
        new InternalServerError(`Handler for query ${query.constructor.name} is not registered`),
      );
  });
});
