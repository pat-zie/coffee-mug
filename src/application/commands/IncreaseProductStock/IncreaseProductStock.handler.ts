import { ProductRepository } from '../../../domain/Product';
import { CommandHandler } from '../CommandHandler';
import { IncreaseProductStockCommand } from './IncreaseProductStock.command';

export class IncreaseProductStockHandler implements CommandHandler<IncreaseProductStockCommand> {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async handle(command: IncreaseProductStockCommand): Promise<void> {
    const product = await this.productRepository.retrieveById(command.id);
    product.restock(command.count);
    await this.productRepository.save(product);
  }
}
