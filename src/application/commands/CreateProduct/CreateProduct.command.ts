import { ProductDto } from '../../../domain/Product';
import { Command } from '../Command';

export class CreateProductCommand implements Command {
  constructor(
    public readonly productDto: ProductDto,
  ) {}
}
