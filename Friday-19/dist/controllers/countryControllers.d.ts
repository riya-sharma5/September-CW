import type { Request, Response } from "express";
export declare const getAllCountries: (req: Request, res: Response, next: any) => Promise<void>;
export declare const createCountry: (req: Request, res: Response, next: any) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCountry: (req: Request, res: Response, next: any) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCountry: (req: Request, res: Response, next: any) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=countryControllers.d.ts.map