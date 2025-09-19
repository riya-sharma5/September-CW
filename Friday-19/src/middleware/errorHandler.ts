import express from 'express'
import type {Request, Response} from 'express'

export interface ErrorType{
    code: number,
    message: string,
    data: any
}

export function errorHandler(err: ErrorType, req: Request, res: Response,  next: any) {
    console.log("into global error handler")
  console.error(err);
  res.status(500).json(err);
}

