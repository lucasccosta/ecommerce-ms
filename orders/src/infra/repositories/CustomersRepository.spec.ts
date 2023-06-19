import { Sequelize } from "sequelize-typescript";
import { CustomersRepository } from "./CustomersRepository"
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker"
import { CustomersModel } from "../../config/db/sequelize/models/CustomersModel";

describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should create a new customer", async () => {
    const customersRepository = new CustomersRepository();

    let customer = {
      externalId: uuid(),
      email: faker.internet.email()
    }

    const customerCreated = await customersRepository.createCustomer({
      externalId: customer.externalId,
      email: customer.email,
    });
    const customerModel = await CustomersModel.findOne({where: { id: customerCreated.dataValues.id}});

    expect(customerModel.dataValues.email).toBe(customer.email);
    expect(customerModel.dataValues.externalId).toBe(customer.externalId);
  })
});
