import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  handle(command: T): Promise<void>
}
