import { UnprocessableEntityError } from '../../shared/errors';

export const MaxProductStringLength = 50;

export class ProductValidator {
  public static validatePrice(price: number): void {
    if (price <= 0) {
      throw new UnprocessableEntityError('Price has to be positive number');
    }
  }

  public static validateStock(stock: number): void {
    if (stock < 0) {
      throw new UnprocessableEntityError('Stock level cannot be negative');
    }
  }

  public static validateName(name: string): void {
    if (name.length > MaxProductStringLength) {
      throw new UnprocessableEntityError(`Product name cannot be bigger than ${MaxProductStringLength}`);
    }
  }

  public static validateDescription(description: string): void {
    if (description.length > MaxProductStringLength) {
      throw new UnprocessableEntityError(`Product description cannot be bigger than ${MaxProductStringLength}`);
    }
  }
}
