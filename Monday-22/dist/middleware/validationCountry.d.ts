import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import type { ObjectSchema } from 'joi';
export declare const validateCountryRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateCountryQuery: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createCountryValidation: Joi.ObjectSchema<any>;
export declare const updateCountryValidation: Joi.ObjectSchema<any>;
export declare const deleteCountryValidation: Joi.ObjectSchema<any>;
export declare const listCountryValidation: Joi.ObjectSchema<any>;
//# sourceMappingURL=validationCountry.d.ts.map