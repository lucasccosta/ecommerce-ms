import { container } from "tsyringe";
import { ICustomersRepository } from "../../infra/repositories/ICustomersRepository";
import { CustomersRepository } from "../../infra/repositories/CustomersRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);
