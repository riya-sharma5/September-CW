import joi from 'joi';
export const createUserValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    country: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pincode: joi.string().required(),
    gender: joi.number().required()
});
export const generateValidation = joi.object({
    email: joi.string().required()
});
export const verifyUserValidation = joi.object({
    email: joi.string().required(),
    OTP: joi.string().required()
});
export const loginValidation = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});
export const resetValidation = joi.object({
    email: joi.string().required(),
    otp: joi.string().required(),
    newPassword: joi.string().required()
});
export const changeValidation = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
    confirmPassword: joi.string().required()
});
export const detailValidation = joi.object({
    email: joi.string().required()
});
export const deleteValidation = joi.object({
    email: joi.string().required()
});
//# sourceMappingURL=validation.js.map