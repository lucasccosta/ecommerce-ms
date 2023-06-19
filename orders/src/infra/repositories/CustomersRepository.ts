import { CustomersModel } from "../../config/db/sequelize/models/CustomersModel";
import { ICustomersRepository } from "./ICustomersRepository";

export class CustomersRepository implements ICustomersRepository {
  private customersModel = CustomersModel;

  async createCustomer({externalId, email}): Promise<CustomersModel>{
    return await this.customersModel.create({ externalId, email });
  }
}
