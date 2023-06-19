import { Router } from "express";
import { customersRouter } from "./customers.routes";

const router = Router();

// router.use(authenticateRouter)
router.use("/customers", customersRouter);


export { router };
