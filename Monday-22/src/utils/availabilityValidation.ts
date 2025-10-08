import Joi from 'joi';

export const createAvailabilityValidation = Joi.object({
    userId : Joi.string().required(),
     expiry: Joi.string().required()
});


export const availableUserListValidation = Joi.object({
      page: Joi.number().integer().min(1).default(1).optional(),
          limit: Joi.number().integer().min(1).max(100).default(20).optional(),
          search: Joi.string().optional()

})