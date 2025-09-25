import Joi from 'joi';
export const validateStateRequest = (schema) => {
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
export const validateStateQuery = (schema) => {
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
export const createStateValidation = Joi.object({
    countryName: Joi.string().required()
});
export const updateStateValidation = Joi.object({
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
//# sourceMappingURL=validateState.js.map