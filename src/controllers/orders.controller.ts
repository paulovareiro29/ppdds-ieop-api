import { Request, Response } from "express";
import primavera from "../services/primavera.service";

const getAll = async (_: Request, res: Response) => {
  const token = res.locals.token;

  const response = await primavera.get("/sales/orders", token);

  return res.json(response);
};

export default { getAll };
