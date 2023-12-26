import Router, { Request, Response } from "express";
import orders from "./orders.routes";
import products from "./products.routes";

const router = Router();

router.use("/orders", orders);
router.use("/products", products);

router.get("/", (request: Request, response: Response) => {
  return response.json("Hello World");
});

export default router;
