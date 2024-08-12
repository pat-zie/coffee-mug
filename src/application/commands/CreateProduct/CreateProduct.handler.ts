import { ProductFactory, ProductRepository } from '../../../domain/Product';
import { CommandHandler } from '../CommandHandler';
import { CreateProductCommand } from './CreateProduct.command';

export class CreateProductHandler implements CommandHandler<CreateProductCommand> {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async handle(command: CreateProductCommand): Promise<void> {
    const product = ProductFactory.create(command.productDto);
    await this.productRepository.save(product);
  }
}
