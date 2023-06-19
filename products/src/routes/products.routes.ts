import { Router } from "express";
import { CreateProductsController } from "../modules/cutomers/create/CreateProductsController";

const productsRouter = Router();

const createProductsController = new CreateProductsController()

productsRouter.post('/create/products', createProductsController.handle)

export { productsRouter }