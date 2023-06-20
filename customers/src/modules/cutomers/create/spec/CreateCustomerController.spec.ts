import { Sequelize } from "sequelize-typescript";
import { faker } from "@faker-js/faker"
import { CustomersRepository } from "../../../../infra/repositories/CustomersRepository";
import { CreateCustomerUseCase } from "../implementations/CreateCustomerUseCase";
import { KafkaProducer } from "../../../../infra/provider/kafka/KafkaProducer";
import { CreateCustomerController } from "../implementations/CreateCustomerController";

describe("Create Users Controller unit tests", () => {
  describe("#create", () => {
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

    const customersRepository = new CustomersRepository()
    const kafkaProducer = new KafkaProducer()
    const createCustomerUseCase = new CreateCustomerUseCase(customersRepository, kafkaProducer)
    const createCustomerController = new CreateCustomerController(createCustomerUseCase)
    
    it("should create an user", async () => {
      const httpRequest = {
        body:{
            name: "Test", 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: "968574125"
        },
      };

      const response = await createCustomerController.handle(httpRequest)

      expect(response.statusCode).toEqual(201);
      expect(response.body.name).toBe(httpRequest.body.name);
      expect(response.body.email).toBe(httpRequest.body.email);
      expect(response.body.password).toBe(httpRequest.body.password);
      expect(response.body.phone).toBe(httpRequest.body.phone);
    });

    it("should respond to insert a valid email", () => {
      expect(async () => {
        const httpRequest = {
          body:{
            name: "", 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: "968574125"
          }
        }
  
        await createCustomerController.handle(httpRequest)

      }).rejects.toThrow("Please insert a valid name")
    });
    it("should respond to insert a valid email", () => {
      expect(async () => {
        const httpRequest = {
          body:{
            name: "", 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: "968574125"
          }
        }
  
        await createCustomerController.handle(httpRequest)

      }).rejects.toThrow("Please insert a valid name")
    });
    it("should respond to insert a valid email", () => {
      expect(async () => {
        const httpRequest = {
          body:{
            name: "Test", 
            email: faker.internet.email(),
            password: "020",
            phone: "968574125"
          }
        }
  
        await createCustomerController.handle(httpRequest)

      }).rejects.toThrow("Please insert a password with at least 8 characters")
    });
    it("should respond to insert a valid phone number", () => {
      expect(async () => {
        const httpRequest = {
          body:{
            name: "Test", 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: ""
          }
        }
  
        await createCustomerController.handle(httpRequest)

      }).rejects.toThrow("Please insert a valid phone number")
    });
  })
});