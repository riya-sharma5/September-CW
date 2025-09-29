export function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json(err);
}
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map