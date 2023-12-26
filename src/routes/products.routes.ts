import Router from "express";
import getToken from "../middlewares/get-token";
import controller from "../controllers/products.controller";

const router = Router();

router.get("/", getToken, controller.getAll);

export default router;
