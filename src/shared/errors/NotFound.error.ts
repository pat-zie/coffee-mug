import { ErrorName } from '../const';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = ErrorName.NotFound;
  }
}
