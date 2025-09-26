import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import type { ObjectSchema } from "joi";
export declare const validateRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateQuery: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createUserValidation: Joi.ObjectSchema<any>;
export declare const generateUserValidation: Joi.ObjectSchema<any>;
export declare const verifyUserValidation: Joi.ObjectSchema<any>;
export declare const loginUserValidation: Joi.ObjectSchema<any>;
export declare const resetUserValidation: Joi.ObjectSchema<any>;
export declare const changeUserValidation: Joi.ObjectSchema<any>;
export declare const detailUserValidation: Joi.ObjectSchema<any>;
export declare const deleteUserValidation: Joi.ObjectSchema<any>;
export declare const editUserValidation: Joi.ObjectSchema<any>;
export declare const logoutUserValidation: Joi.ObjectSchema<any>;
export declare const listUserValidation: Joi.ObjectSchema<any>;
//# sourceMappingURL=validationUser.d.ts.map