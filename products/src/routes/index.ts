import { Router } from "express";
import { productsRouter } from "./products.routes";

const router = Router();

// router.use(authenticateRouter)
router.use("/products", productsRouter);

export { router };
