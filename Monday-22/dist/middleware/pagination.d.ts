import { Model } from "mongoose";
interface PaginationOptions {
    page?: number;
    limit?: number;
    searchTerm?: string;
    lookup?: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
        pipeline?: any[];
    };
}
export declare const pagination: (model: Model<any>, options: PaginationOptions) => Promise<{
    pagination: {
        totalDocs: any;
        page: number;
        limit: number;
        totalPages: number;
    };
    data: any;
}>;
export {};
//# sourceMappingURL=pagination.d.ts.map