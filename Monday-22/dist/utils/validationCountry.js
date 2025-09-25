import Joi from 'joi';
export const createCountryValidation = Joi.object({
    countryName: Joi.string().required()
});
export const updateCountryValidation = Joi.object({
    countryName: Joi.string().required(),
    _id: Joi.string().required()
});
export const deleteCountryValidation = Joi.object({
    countryName: Joi.string().required()
});
export const listCountryValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    limit: Joi.number().integer().min(1).max(100).default(20).optional()
});
//# sourceMappingURL=validationCountry.js.map