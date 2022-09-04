import { Request, Response } from "express";

export default (_request: Request, response: Response) => 
  response.status(404).send("Route does not exists.");