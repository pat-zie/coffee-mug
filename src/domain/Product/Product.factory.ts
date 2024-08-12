import { Id } from '../../shared';
import { Product } from './Product';
import { ProductDto } from './Product.dto';
import { ProductValidator } from './Product.validator';

export class ProductFactory {
  static create(productDto: ProductDto): Product {
    ProductValidator.validateName(productDto.name);
    ProductValidator.validateDescription(productDto.description);
    ProductValidator.validatePrice(productDto.price);
    ProductValidator.validateStock(productDto.stock);

    return new Product(
      Id.create(),
      productDto.name,
      productDto.description,
      productDto.price,
      productDto.stock,
    );
  }
}
