import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import type { ObjectSchema } from "joi";
export declare const validateRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateQuery: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const genresValidation: Joi.ObjectSchema<any>;
export declare const languageValidation: Joi.ObjectSchema<any>;
export declare const yearValidation: Joi.ObjectSchema<any>;
//# sourceMappingURL=Validation.d.ts.map