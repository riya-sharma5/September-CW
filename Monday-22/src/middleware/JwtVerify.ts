import type { Request, Response, NextFunction } from "express";
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { userInfo } from "os";

dotenv.config();

interface DecodedToken extends JwtPayload {
  user: {
    _id: string;
  };
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("inside middleware")
    const authHeader = req.headers['authorization'];
    console.log(" header data", authHeader)
     const token = authHeader && authHeader.split(" ")[1];
     console.log(token)

    if (!token) {
      res.status(401).json({
        code: 401,
        status: "failed",
        message: "Unauthorized request",
      });
      return;
    }

    const decodedTokenInfo = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as DecodedToken;

    console.log("decoded info", decodedTokenInfo)

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
  } catch (error: any) {
    res.status(401).json({
      status: "failed",
      error: error?.message,
      message: "Invalid Access Token",
    });
  }
};

