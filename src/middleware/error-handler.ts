import { Request, Response, NextFunction } from "express";


export default (error: Error, _request: Request, response: Response,
  _next: NextFunction) => {
  console.log(error);
  return response.status(500).json({
    message: "Something went wrong."
  });
};