import { container } from "tsyringe";
import { IProductsRepository } from "../../infra/repositories/IProductsRepositoryRepository";
import { ProductsRepository } from "../../infra/repositories/ProductsRepositoryRepository";

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);
