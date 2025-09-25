import Joi from 'joi';
export const validateRequest = (schema) => {
    return (req, res, next) => {
        console.log(req.body);
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0]?.message,
            });
        }
        next();
    };
};
export const validateQuery = (schema) => {
    return (req, res, next) => {
        console.log(req.params);
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({
                error: error.details[0]?.message,
            });
        }
        next();
    };
};
export const createUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    country: Joi.string().required(),
    profilePhotoURL: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    gender: Joi.number().required()
});
export const generateUserValidation = Joi.object({
    email: Joi.string().email().required()
});
export const verifyUserValidation = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required()
});
export const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
export const resetUserValidation = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required()
});
export const changeUserValidation = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required()
});
export const detailUserValidation = Joi.object({
    email: Joi.string().email().required()
});
export const deleteUserValidation = Joi.object({
    email: Joi.string().email().required()
});
export const editUserValidation = Joi.object({
    name: Joi.string().optional(),
    gender: Joi.number().optional(),
    email: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    profilePhotoURL: Joi.string().optional()
});
export const logoutUserValidation = Joi.object({
    email: Joi.string().optional()
});
export const listUserValidation = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional()
});
//# sourceMappingURL=validationUser.js.map