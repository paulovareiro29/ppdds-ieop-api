import Router from "express";
import getToken from "../middlewares/get-token";
import controller from "../controllers/orders.controller";

const router = Router();

router.get("/", getToken, controller.getAll);
router.post("/", getToken, controller.create);

export default router;
