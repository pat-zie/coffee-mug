import { Request, Response } from 'express';
import { CommandDispatcher } from '../../../../application/commands';
import { QueryDispatcher } from '../../../../application/queries';
import { CreateProductCommand } from '../../../../application/commands/CreateProduct';
import { HttpSuccessStatusCode } from '../shared';
import { IncreaseProductStockCommand } from '../../../../application/commands/IncreaseProductStock';
import { SellProductCommand } from '../../../../application/commands/SellProduct';
import { ProductListResponseMapper } from './ProductList.mapper';
import { RetrieveProductListQuery } from '../../../../application/queries/RetrieveProductList';
import { Product } from '../../../../domain/Product';

export class ProductController {
  constructor(
    private readonly commandDispatcher: CommandDispatcher,
    private readonly queryDispatcher: QueryDispatcher,
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    const { name, description, price, stock } = request.body;
    await this.commandDispatcher.dispatch(
      new CreateProductCommand({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      }),
    );
    response
      .status(HttpSuccessStatusCode.NoContent)
      .send();
  }

  async restock(request: Request, response: Response) {
    const { body, params } = request;
    await this.commandDispatcher.dispatch(
      new IncreaseProductStockCommand(
        params.id,
        parseInt(body.count, 10),
      ),
    );
    response
      .status(HttpSuccessStatusCode.NoContent)
      .send();
  }

  async sell(request: Request, response: Response) {
    const { body, params } = request;
    await this.commandDispatcher.dispatch(
      new SellProductCommand(
        params.id,
        parseInt(body.count, 10),
      ),
    );
    response
      .status(HttpSuccessStatusCode.NoContent)
      .send();
  }    

  async retrieveList(_: Request, response: Response) {
    const productList = await this.queryDispatcher.dispatch<Product[]>(
      new RetrieveProductListQuery(),
    );
    response
      .send(ProductListResponseMapper.fromDomain(productList));
  }
}
