import { ICustomersRepository } from "./ICustomersRepository";
import { CustomersModel } from "../../config/db/sequelize/models/CustomersModel";
import { ICreateCustomer } from "../DTOs";
import { Customer } from "../../modules/domain/Customer";

export class CustomersRepository implements ICustomersRepository {
  private customerModel = CustomersModel;

  async createCustomer({
    id,
    name,
    email,
    password,
    phone,
  }: ICreateCustomer): Promise<CustomersModel> {
    return await this.customerModel.create({id, name, email, password, phone });
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.customerModel.findOne({ where: { email } });
    if (customer) {
      return new Customer({
        id: customer.dataValues.id,
        name: customer.dataValues.name,
        email: customer.dataValues.email,
        password: customer.dataValues.password,
        phone: customer.dataValues.phone,
      });
    }
    return;
  }
}
