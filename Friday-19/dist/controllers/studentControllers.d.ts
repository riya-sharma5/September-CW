import type { Request, Response } from "express";
export declare const registerStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listStudents: (req: Request, res: Response) => Promise<void>;
export declare const studentDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=studentControllers.d.ts.map