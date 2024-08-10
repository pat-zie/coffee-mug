import { Product } from '../../../../domain/Product';

export interface RetrieveProductListResponse {
  count: number,
  itemList: {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
  }[]
}


export class ProductListResponseMapper {
  public static fromDomain(productList: Product[]): RetrieveProductListResponse {
    return {
      count: productList.length,
      itemList: productList.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,         
      })),
    };
  }
}
