import type { Request, Response, NextFunction } from "express";
export declare const getAllMoviesGroupedByGenres: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMoviesGroupedByLanguage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMoviesByYearGroupedByGenre: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=queryControllers.d.ts.map