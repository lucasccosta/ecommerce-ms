import { CustomersModel } from "../../config/db/sequelize/models/CustomersModel";
import { ICreateCustomer } from "../../modules/cutomers/DTOs";
import { Customer } from "../../modules/domain/Customer";

export interface ICustomersRepository {
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createCustomer({ id, name, email, password, phone}: ICreateCustomer): Promise<CustomersModel>;
}
