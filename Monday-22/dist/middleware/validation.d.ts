import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import type { ObjectSchema } from 'joi';
export declare const validateRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createUserValidation: Joi.ObjectSchema<any>;
export declare const generateValidation: Joi.ObjectSchema<any>;
export declare const verifyUserValidation: Joi.ObjectSchema<any>;
export declare const loginValidation: Joi.ObjectSchema<any>;
export declare const resetValidation: Joi.ObjectSchema<any>;
export declare const changeValidation: Joi.ObjectSchema<any>;
export declare const detailValidation: Joi.ObjectSchema<any>;
export declare const deleteValidation: Joi.ObjectSchema<any>;
export declare const editValidation: Joi.ObjectSchema<any>;
export declare const logoutValidation: Joi.ObjectSchema<any>;
//# sourceMappingURL=validation.d.ts.map