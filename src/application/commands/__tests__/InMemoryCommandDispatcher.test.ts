import { mock } from 'jest-mock-extended';
import { Command } from '../Command';
import { InMemoryCommandDispatcher } from '../InMemoryCommandDispatcher';
import { CommandHandler } from '../CommandHandler';
import { InternalServerError } from '../../../shared/errors';

class TestCommand implements Command {}

describe(InMemoryCommandDispatcher.name, () => {
  let inMemoryCommandDispatcher: InMemoryCommandDispatcher;

  beforeEach(() => {
    inMemoryCommandDispatcher = new InMemoryCommandDispatcher();
  });

  it('registers and dispatches a command', async () => {
    expect.assertions(2);

    // GIVEN
    const command = new TestCommand();
    const commandName = command.constructor.name;
    const commandHandler = mock<CommandHandler<TestCommand>>();

    // WHEN
    inMemoryCommandDispatcher.register(commandName, commandHandler);
    await inMemoryCommandDispatcher.dispatch(command);

    // THEN
    expect(commandHandler.handle).toHaveBeenCalledTimes(1);
    expect(commandHandler.handle).toHaveBeenCalledWith(command);
  });

  it('throws an error when command handler is not registered', async () => {
    expect.assertions(1);

    // GIVEN
    const command = new TestCommand();

    // WHEN
    await expect(inMemoryCommandDispatcher.dispatch(command))
    // THEN
      .rejects.toThrow(
        new InternalServerError(`Handler for command ${command.constructor.name} is not registered`),
      );
  });
});
