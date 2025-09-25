import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import type { ObjectSchema } from 'joi';
export declare const validateStateRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateStateQuery: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createStateValidation: Joi.ObjectSchema<any>;
export declare const updateStateValidation: Joi.ObjectSchema<any>;
export declare const deleteCountryValidation: Joi.ObjectSchema<any>;
export declare const listCountryValidation: Joi.ObjectSchema<any>;
//# sourceMappingURL=validateState.d.ts.map