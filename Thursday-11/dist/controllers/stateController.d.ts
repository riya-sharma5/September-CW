import type { Request, Response } from "express";
export declare const getAllStates: (req: Request, res: Response) => Promise<void>;
export declare const createState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=stateController.d.ts.map