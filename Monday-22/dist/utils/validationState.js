import Joi from 'joi';
export const createStateValidation = Joi.object({
    stateName: Joi.string().required(),
    countryId: Joi.string().required()
});
export const updateStateValidation = Joi.object({
    stateName: Joi.string().required(),
    _id: Joi.string().required()
});
export const deleteStateValidation = Joi.object({
    stateName: Joi.string().required()
});
export const listStateValidation = Joi.object({
    countryId: Joi.string().required()
});
export const getAllStatesValidation = Joi.object({
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional()
});
//# sourceMappingURL=validationState.js.map