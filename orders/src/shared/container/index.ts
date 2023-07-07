import { container } from "tsyringe";
import { ICustomersRepository } from "../../infra/repositories/customers/ICustomersRepository";
import { ProductsRepository } from "../../infra/repositories/products/ProductsRepository";
import { IProductsRepository } from "../../infra/repositories/products/IProductsRepository";
import { CustomersRepository } from "../../infra/repositories/customers/CustomersRepository";
import { IOrdersRepository } from "../../infra/repositories/orders/IOrdersRepository";
import { OrdersRepository } from "../../infra/repositories/orders/OrdersRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);
