import { Router } from "express";
import { CreateOrderController } from "../modules/create-order/CreateOrderController";

const ordersRouter = Router();

const createOrderController = new CreateOrderController();

ordersRouter.post("/create", createOrderController.handle);

export { ordersRouter };
