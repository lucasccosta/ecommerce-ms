import { Router } from "express";
import { createCustomerAdapter } from "../modules/cutomers/adapters/CustomersAdapter";
import { createCustomerControllerFactory } from "../modules/cutomers/create/factory/CreateCustomerControllerFactory";

const customersRouter = Router();

customersRouter.post('/create/users', createCustomerAdapter(createCustomerControllerFactory()))

export { customersRouter }