import  type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import type { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    
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
     
      let result = await schema.validateAsync(req.query);
        req.query = result;
        next();
    } catch (error: any) {
      return res.status(400).json({
        error: error?.details ? error?.details[0]?.message : "something went wrong",
      });
    }
  };
};

export const genresValidation = Joi.object({
 page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
   minRating: Joi.number().min(0).max(10).default(0).optional()
});

export const languageValidation = Joi.object({
   page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
   minRating: Joi.number().min(0).max(10).default(0).optional()
});


export const yearValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
   year: Joi.number().integer().required()
});
