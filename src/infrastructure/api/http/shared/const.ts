export enum HttpSuccessStatusCode {
  Ok = 200,
  NoContent = 204,
}

export enum HttpErrorStatusCode {
  BadRequest = 400,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServer = 500,
}

export enum ApiPath {
  CreateProduct = '/products',
  RetrieveProductList = '/products',
  RestockProduct = '/products/:id/restock',
  SellProduct = '/products/:id/sell',
  CreateOrder = '/orders',
}

export enum HttpRequestValidationKey {
  Body = 'Body',
  Params = 'Params',
}
