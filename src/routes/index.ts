import Router, { Request, Response } from "express";
import orders from "./orders.routes";

const router = Router();

router.use("/orders", orders);

router.get("/", (request: Request, response: Response) => {
  return response.json("Hello World");
});

export default router;
