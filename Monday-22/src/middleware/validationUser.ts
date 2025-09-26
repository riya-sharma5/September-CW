import  type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import type { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req, 'request')
      let result = await schema.validateAsync(req.body);
      req.body = result;
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.details[0]?.message,
      });
    }
  };
};

export const validateQuery = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("trying to validate query");
      console.log("query :", req.query);
      let result = await schema.validateAsync(req.query);
      console.log("resule to store :", result);
      req.query = result;
      console.log("executing next function ...")
      next();
    } catch (error: any) {
      console.log("error is", error)
      return res.status(400).json({
        error: error?.details ? error?.details[0]?.message : "something went wrong",
      });
    }
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
  gender: Joi.number().required(),
});

export const generateUserValidation = Joi.object({
  email: Joi.string().email().required(),
});

export const verifyUserValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resetUserValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const changeUserValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const detailUserValidation = Joi.object({
  email: Joi.string().email().required(),
});

export const deleteUserValidation = Joi.object({
  email: Joi.string().email().required(),
});

export const editUserValidation = Joi.object({
  name: Joi.string().optional(),
  gender: Joi.number().optional(),
  email: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  profilePhotoURL: Joi.string().optional(),
});

export const logoutUserValidation = Joi.object({
  email: Joi.string().optional(),
});

export const listUserValidation = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});
