"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = async (model, options) => {
    const { page = 1, limit = 10, searchTerm, lookup } = options;
    let filter = {};
    if (searchTerm) {
        filter = {
            title: { $regex: searchTerm, $options: "i" },
            content: { $regex: searchTerm, $options: "i" },
        };
    }
    const pipeline = [{ $match: filter }];
    if (lookup) {
        pipeline.push({
            $lookup: {
                from: lookup.from,
                localField: lookup.localField,
                foreignField: lookup.foreignField,
                as: lookup.as,
                ...(lookup.pipeline ? { pipeline: lookup.pipeline } : {}),
            },
        });
    }
    pipeline.push({
        $facet: {
            totalCount: [{ $count: "total" }],
            paginatedResults: [
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ],
        },
    }, {
        $project: {
            paginatedResults: 1,
            totalDocs: { $ifNull: [{ $arrayElemAt: ["$totalCount.total", 0] }, 0] },
        },
    });
    const result = await model.aggregate(pipeline);
    return {
        pagination: {
            totalDocs: result[0]?.totalDocs || 0,
            page,
            limit,
            totalPages: Math.ceil((result[0]?.totalDocs || 0) / limit),
        },
        data: result[0]?.paginatedResults || [],
    };
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map