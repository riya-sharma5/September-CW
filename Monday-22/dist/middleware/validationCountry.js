import Joi from 'joi';
export const validateCountryRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0]?.message,
            });
        }
        next();
    };
};
export const validateCountryQuery = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({
                error: error.details[0]?.message,
            });
        }
        next();
    };
};
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
    page: Joi.number().optional(),
    limit: Joi.number().optional()
});
//# sourceMappingURL=validationCountry.js.map