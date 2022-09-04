import { Request, Response, NextFunction } from "express";


export default (_error: Error, _request: Request, response: Response,
  _next: NextFunction) => {  
  return response.status(500).json({
    message: "Something went wrong."
  });
};