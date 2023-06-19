import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../../../infra/repositories/ICustomersRepository";
import { ICreateCustomerRequest } from "../../../infra/DTOs";
import { IKafkaProducer } from "../../../infra/provider/kafka/IKafkaProducer";
import { Customer } from "../../domain/Customer";
import { v4 as uuid } from "uuid";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("KafkaProducer")
    private KafkaProducer: IKafkaProducer
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: ICreateCustomerRequest): Promise<string> {
    let customer = await this.customersRepository.getCustomerByEmail(email);
    if (customer) throw new Error(`Customer already exists`);
    customer = new Customer({id: uuid(), email, name, password, phone})

    try {
      const customerCreated = await this.customersRepository.createCustomer({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
      });

      await this.KafkaProducer.sendMessage('CUSTOMER_CREATED', customerCreated)
      return "Customer Created";
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
}
