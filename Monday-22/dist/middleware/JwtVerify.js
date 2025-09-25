import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                code: 401,
                status: "failed",
                message: "Unauthorized request: No token",
            });
            return;
        }
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await userModel.findById(decodedToken._id);
        if (!user) {
            res.status(401).json({
                code: 401,
                status: "failed",
                message: "Unauthorized request: User not found",
            });
            return;
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: "failed",
            error: error?.message,
            message: "Invalid Access Token",
        });
    }
};
//# sourceMappingURL=JwtVerify.js.map