import { CustomersModel } from "../../config/db/sequelize/models/CustomersModel";

type ICreateCustomer = {
  externalId: string;
  email: string;
}

export interface ICustomersRepository {
  createCustomer({externalId, email}: ICreateCustomer): Promise<CustomersModel>
}
