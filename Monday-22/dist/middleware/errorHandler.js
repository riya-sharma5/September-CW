import express from 'express';
export function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json(err);
}
//# sourceMappingURL=errorHandler.js.map