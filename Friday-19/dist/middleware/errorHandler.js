import express from 'express';
export function errorHandler(err, req, res, next) {
    console.log("into global error handler");
    console.error(err);
    res.status(500).json(err);
}
//# sourceMappingURL=errorHandler.js.map