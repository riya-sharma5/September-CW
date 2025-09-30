import type { Request, Response, NextFunction } from "express";
import studentModel from "../models/studentModels";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

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
    const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(" ")[1];

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

    const student = await studentModel.findById(decodedTokenInfo.id);

    if (!student) {
      res.status(401).json({
        code: 401,
        status: "failed",
        message: "Unauthorized request",
      });
      return;
    }

   
    res.locals.student = student;
    next();
  } catch (error: any) {
    res.status(401).json({
      status: "failed",
      error: error?.message,
      message: "Invalid Access Token",
    });
  }
};

