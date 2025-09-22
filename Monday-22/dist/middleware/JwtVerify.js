import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { userInfo } from "os";
dotenv.config();
export const verifyJWT = async (req, res, next) => {
    try {
        console.log("inside middleware");
        const authHeader = req.headers['authorization'];
        console.log(" header data", authHeader);
        const token = authHeader && authHeader.split(" ")[1];
        console.log(token);
        if (!token) {
            res.status(401).json({
                code: 401,
                status: "failed",
                message: "Unauthorized request",
            });
            return;
        }
        const decodedTokenInfo = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log("decoded info", decodedTokenInfo);
        const user = await userModel.findById(decodedTokenInfo._id);
        if (!user) {
            res.status(401).json({
                code: 401,
                status: "failed",
                message: "Unauthorized request",
            });
            return;
        }
        res.locals.user = userInfo;
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