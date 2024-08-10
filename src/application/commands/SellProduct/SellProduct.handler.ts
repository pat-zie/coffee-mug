import { ProductRepository } from '../../../domain/Product';
import { CommandHandler } from '../CommandHandler';
import { SellProductCommand } from './SellProduct.command';

export class SellProductHandler implements CommandHandler<SellProductCommand> {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {} 

  async handle(command: SellProductCommand): Promise<void> {
    const product = await this.productRepository.retrieveById(command.id);
    product.sell(command.count);
    await this.productRepository.save(product);
  }
}
