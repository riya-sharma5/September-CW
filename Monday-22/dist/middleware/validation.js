import joi from 'joi';
export const createUserValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    country: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pincode: joi.string().required(),
});
//# sourceMappingURL=validation.js.map