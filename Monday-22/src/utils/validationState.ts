
import Joi from 'joi';

export const createStateValidation = Joi.object({
    stateName: Joi.string().required(),
    countryId: Joi.string().required()
})


export const updateStateValidation = Joi.object({
    stateName: Joi.string().required(),
    _id: Joi.string().required()
})

export const deleteStateValidation = Joi.object({
    stateName: Joi.string().required()
})

export const listStateValidation = Joi.object({
    countryId: Joi.string().required()
})

export const getAllStatesValidation = Joi.object({
       page: Joi.number().integer().min(1).default(1).optional(),
     limit: Joi.number().integer().min(1).max(100).default(20).optional()
})
