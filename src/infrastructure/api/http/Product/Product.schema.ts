import Joi from 'joi';

const Id = Joi.string().uuid();

export const SellProductParamsSchema = Joi.object({
  id: Id.required(),
});

export const SellProductBodySchema = Joi.object({
  count: Joi.number().integer().positive().required(),
});

export const RestockProductParamsSchema = Joi.object({
  id: Id.required(),
});

export const RestockProductBodySchema = Joi.object({
  count: Joi.number().integer().required(),
});

export const CreateProductBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().positive().allow(0).required(),
});
