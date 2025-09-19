import type { Request, Response } from 'express';
export interface ErrorType {
    code: number;
    message: string;
    data: any;
}
export declare function errorHandler(err: ErrorType, req: Request, res: Response, next: any): void;
//# sourceMappingURL=errorHandler.d.ts.map