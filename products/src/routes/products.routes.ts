import { Router } from "express";
import { CreateProductsController } from "../modules/products/create/CreateProductsController";
import { CheckProductAvailabilityController } from "../modules/products/availability/CheckProductAvailabilityController";

const productsRouter = Router();

const createProductsController = new CreateProductsController();
const checkProductAvailabilityController =
  new CheckProductAvailabilityController();

productsRouter.post("/create", createProductsController.handle);
productsRouter.post("/availability", checkProductAvailabilityController.handle);

export { productsRouter };
