import Joi from 'joi';

const Id = Joi.string().uuid();

export const CreateOrderBodySchema = Joi.object({
  customerId: Id.required(),
  itemList: Joi.array().items(
    Joi.object({
      productId: Id.required(),
      count: Joi.number().integer().positive().required(),
    }).required(),
  ).required(),
});
