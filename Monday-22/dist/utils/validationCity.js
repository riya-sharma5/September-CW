import Joi from 'joi';
export const createCityValidation = Joi.object({
    cityName: Joi.string().required(),
    stateId: Joi.string().required()
});
export const updateCityValidation = Joi.object({
    cityName: Joi.string().required(),
    _id: Joi.string().required()
});
export const deleteCityValidation = Joi.object({
    cityName: Joi.string().required()
});
export const listCityValidation = Joi.object({
    stateId: Joi.string().required()
});
export const getAllCitiesValidation = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional()
});
//# sourceMappingURL=validationCity.js.map