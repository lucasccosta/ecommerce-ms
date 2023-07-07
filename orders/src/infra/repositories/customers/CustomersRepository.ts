import { prisma } from "../../database/prismaClient";
import { ICustomersRepository } from "./ICustomersRepository";
import { Customers } from "@prisma/client";

export class CustomersRepository implements ICustomersRepository {
  private customersModel = prisma.customers;

  async createCustomer({ externalId, email }): Promise<Customers> {
    return await this.customersModel.create({ data: { externalId, email } });
  }

  async getByExternalId({ externalId }): Promise<Customers> {
    return await this.customersModel.findFirst({ where: { externalId } });
  }
}
