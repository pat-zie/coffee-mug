import { Command } from './Command';
import { CommandHandler } from './CommandHandler';

export interface CommandDispatcher {
  register<T extends Command>(commandName: string, handler: CommandHandler<T>): void;
  dispatch(command: Command): Promise<void>;
}
