import type { Request, Response } from "express";
export declare const getAllCities: (req: Request, res: Response) => Promise<void>;
export declare const createCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cityController.d.ts.map