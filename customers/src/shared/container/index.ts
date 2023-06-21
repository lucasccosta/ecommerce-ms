import { container } from "tsyringe";
import { ICustomersRepository } from "../../infra/repositories/customer/ICustomersRepository";
import { CustomersRepository } from "../../infra/repositories/customer/CustomersRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);
