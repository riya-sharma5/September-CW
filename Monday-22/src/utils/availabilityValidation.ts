import Joi from 'joi';

export const createAvailabilityValidation = Joi.object({
    userId : Joi.string().required(),
     expiry: Joi.string().required()
})