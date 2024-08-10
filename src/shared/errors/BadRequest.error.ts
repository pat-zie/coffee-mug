import { ErrorName } from '../const';

export class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = ErrorName.BadRequest;
  }
}
