import { Router } from "express";
import { CreateCustomerController } from "../modules/cutomers/create/CreateCustomerController";

const customersRouter = Router();

const createCustomerController = new CreateCustomerController()

customersRouter.post('/create/users', createCustomerController.handle)

export { customersRouter }