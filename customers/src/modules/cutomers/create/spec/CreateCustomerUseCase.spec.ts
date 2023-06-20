import { Sequelize } from "sequelize-typescript";
import { CreateCustomerUseCase } from "../implementations/CreateCustomerUseCase";
import { CustomersRepository } from "../../../../infra/repositories/CustomersRepository";
import { KafkaProducer } from "../../../../infra/provider/kafka/KafkaProducer";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid"

describe("use case unit tests", () => {
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
  
  const customerRepository = new CustomersRepository();
  const kafkaProducer = new KafkaProducer()
  const useCase = new CreateCustomerUseCase(customerRepository, kafkaProducer);

  it("should create an customer", async () => {
    const customer = {
      name: "Test",
      email: faker.internet.email(),
      password: "9998885520",
      phone: "985632584",
    }

    const userCreated = await useCase.execute({
      name: customer.name,
      email: customer.email,
      password: customer.password,
      phone: customer.phone
    });


    expect(userCreated.body.name).toBe(customer.name);
    expect(userCreated.body.email).toBe(customer.email);
    expect(userCreated.body.password).toBe(customer.password);
    expect(userCreated.body.phone).toBe(customer.phone);
  });

  it("should return Customer already exists error", () => {
    expect(async () => {
      const customer1 = {
        id: uuid(),
        name: "Test",
        email: faker.internet.email(),
        password: "9998885520",
        phone: "985632584",
      }

      await customerRepository.createCustomer({
        id: customer1.id,
        name: customer1.name,
        email: customer1.email,
        password: customer1.password,
        phone: customer1.phone
      })
  
      const customer2 = {
        id: uuid(),
        name: "Test 2",
        email: customer1.email,
        password: "999888552200",
        phone: "985637854",
      }
      await useCase.execute({
        name: customer2.name,
        email: customer2.email,
        password: customer2.password,
        phone: customer2.phone
      }
      );
      
    }).rejects.toThrow("Customer already exists");
  });
});
