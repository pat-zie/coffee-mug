import { ErrorName } from '../const';

export class InternalServerError extends Error {
  constructor(message) {
    super(message);

    this.name = ErrorName.InternalServer;
  }
}
