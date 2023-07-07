import { Customers } from "@prisma/client";

type ICreateCustomer = {
  externalId: string;
  email: string;
};

export interface ICustomersRepository {
  createCustomer({ externalId, email }: ICreateCustomer): Promise<Customers>;
  getByExternalId({ externalId }): Promise<Customers>;
}
