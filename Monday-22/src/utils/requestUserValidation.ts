import Joi from "joi";

export const sendRequestValidation = Joi.object({
  fromUserId: Joi.string().required(),
  toUserId: Joi.string().required(),
  content: Joi.string().required(),
});

export const listValidation = Joi.object({
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
  listType: Joi.string().optional(),
  search: Joi.string().optional(),
});

export const acceptValidation = Joi.object({
  requestId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const rejectValidation = Joi.object({
  requestId: Joi.string().required(),
  userId: Joi.string().required(),
});
