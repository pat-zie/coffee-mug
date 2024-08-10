import { randomUUID } from 'crypto';

export class Id {
  public static create(): string {
    return randomUUID();
  }
}
