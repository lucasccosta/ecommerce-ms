import { Sequelize } from "sequelize-typescript";
import { CustomersRepository } from "./CustomersRepository"
import { Customer } from "../../modules/domain/Customer";
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

    let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: faker.internet.email(),
        password: "123456789",
        phone: "985632541"
      });      

    const customerCreated = await customersRepository.createCustomer({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      phone: customer.phone,
    });
    const customerModel = await CustomersModel.findOne({where: { id: customerCreated.dataValues.id}});

    expect(customerModel.dataValues.id).toBe(customer.id);
    expect(customerModel.dataValues.name).toBe(customer.name);
    expect(customerModel.dataValues.email).toBe(customer.email);
    expect(customerModel.dataValues.password).toBe(customer.password);
    expect(customerModel.dataValues.phone).toBe(customer.phone);
  })

  // it("should update a customer", async () => {
  //   const customersRepository = new CustomersRepository();

  //   let customer = new Customer({
  //       id: uuid(),
  //       name: "Test",
  //       email: faker.internet.email(),
  //       password: "123456789",
  //       phone: "985632541"
  //     });      

  //   await customersRepository.createCustomer({
    // id: customer.id,
    //   name: customer.name,
    //   email: customer.email,
    //   password: customer.password,
    //   phone: customer.phone,
  // });

  //   customer.changeEmail("test2@test.com");
  //   await customersRepository.update(customer);
  //   const customerModel = await CustomersModel.findOne({ where: { id: customer.id } });

  //   expect(customerModel.toJSON()).toStrictEqual({
  //     id: customer.id,
  //     name: customer.name,
  //     email: customer.email,
  //     password: customer.password,
  //     phone: customer.phone,
  //   });
  // });

  it("should find a customer by its email", async () => {
    const customersRepository = new CustomersRepository();

    let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: faker.internet.email(),
        password: "123456789",
        phone: "985632541"
    })

    await customersRepository.createCustomer({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      phone: customer.phone,
    });

    const customerResult = await customersRepository.getCustomerByEmail(customer.email);

    expect(customer).toStrictEqual(customerResult);
  });

  // it("should find a customer by its id", async () => {
  //   const customersRepository = new CustomersRepository();

  //   await customersRepository.create(customer1);
  //   await customersRepository.create(customer2);

  //   const customerResult = await customersRepository.getAll();

  //   expect(customerResult).toContainEqual(customer1);
  //   expect(customerResult).toContainEqual(customer2);
  //   expect(customerResult).toHaveLength(2);
  // });
});
