import { ErrorName } from '../const';

export class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message);

    this.name = ErrorName.UnprocessableEntity;
  }
}
