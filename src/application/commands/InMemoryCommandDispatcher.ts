import { InternalServerError } from '../../shared/errors';
import { Command } from './Command';
import { CommandDispatcher } from './CommandDispatcher';
import { CommandHandler } from './CommandHandler';

export class InMemoryCommandDispatcher implements CommandDispatcher {
  private handlers = new Map<string, CommandHandler<Command>>();

  register<T extends Command>(commandName: string, handler: CommandHandler<T>): void {
    this.handlers.set(commandName, handler);
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new InternalServerError(`Handler for command ${command.constructor.name} is not registered`);
    }

    await handler.handle(command);
  }
}
