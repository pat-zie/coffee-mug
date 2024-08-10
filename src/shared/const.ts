export const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export enum ErrorName {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  UnprocessableEntity = 'UnprocessableEntity',
  InternalServer = 'InternalServer',
}
