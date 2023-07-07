import { Router } from "express";
import { ordersRouter } from "./orders.routes";

const router = Router();

router.use("/orders", ordersRouter);

export { router };
