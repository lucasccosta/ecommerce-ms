import { ICustomersRepository } from "../../../../infra/repositories/ICustomersRepository";
import { IKafkaProducer } from "../../../../infra/provider/kafka/IKafkaProducer";
import { Customer } from "../../../domain/Customer";
import { v4 as uuid } from "uuid";
import { CustomError } from "../CustomError";
import { ICreateCustomerUseCase } from "../ICreateCustomerUsecase";
import { ICreateCustomerRequest } from "../../DTOs";
import { HttpResponse } from "../../../../infra/DTOs";

export class CreateCustomerUseCase implements ICreateCustomerUseCase {

  private customersRepository: ICustomersRepository;
  private kafkaProducer: IKafkaProducer

  constructor(customersRepository: ICustomersRepository, kafkaProducer: IKafkaProducer) {
    this.customersRepository = customersRepository;
    this.kafkaProducer = kafkaProducer;
  }

  async execute({
    name,
    email,
    password,
    phone,
  }: ICreateCustomerRequest): Promise<HttpResponse> {
    let customer = await this.customersRepository.getCustomerByEmail(email);
    if (customer) throw new CustomError(`Customer already exists`, 409);
    customer = new Customer({id: uuid(), email, name, password, phone})

    try {
      const customerCreated = await this.customersRepository.createCustomer({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
      });

      // await this.kafkaProducer.sendMessage('CUSTOMER_CREATED', customerCreated)
      return {
        body: customerCreated,
        statusCode: 201
      };
    } catch (error) {
      return {
        statusCode: 404,
        error: new CustomError("An error occurred", 404)
      }
    }
  }
}
