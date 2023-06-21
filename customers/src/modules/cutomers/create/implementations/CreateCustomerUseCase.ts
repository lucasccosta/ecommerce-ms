import { ICustomersRepository } from "../../../../infra/repositories/customer/ICustomersRepository";
import { Customer } from "../../../domain/Customer";
import { v4 as uuid } from "uuid";
import { CustomError } from "../CustomError";
import { ICreateCustomerUseCase } from "../ICreateCustomerUsecase";
import { ICreateCustomerRequest } from "../../DTOs";
import { HttpResponse } from "../../../../infra/DTOs";
import IEventDispatcher from "../../../../shared/event/IEventDispatcher";
import CustomerCreatedEvent from "../../event/CustomerCreatedEvent";
import IEventHandler from "../../../../shared/event/IEventHandler";

export class CreateCustomerUseCase implements ICreateCustomerUseCase {

  private customersRepository: ICustomersRepository;
  private eventDispatcher: IEventDispatcher
  private customerCreatedHandler: IEventHandler<CustomerCreatedEvent>
  private saveAtEventStoreHandler: IEventHandler<CustomerCreatedEvent>

  constructor(
    customersRepository: ICustomersRepository,
    eventDispatcher: IEventDispatcher,
    customerCreatedHandler: IEventHandler<CustomerCreatedEvent>,
    saveAtEventStoreHandler: IEventHandler<CustomerCreatedEvent>
  ) {
    this.customersRepository = customersRepository;
    this.eventDispatcher = eventDispatcher;
    this.customerCreatedHandler = customerCreatedHandler;
    this.saveAtEventStoreHandler = saveAtEventStoreHandler;
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
      
      
      this.eventDispatcher.register("CustomerCreatedEvent", this.customerCreatedHandler)
      this.eventDispatcher.register("CustomerCreatedEvent", this.saveAtEventStoreHandler)
      const customerCreatedEvent = new CustomerCreatedEvent({id: customer.id,email: customer.email})
      this.eventDispatcher.notify(customerCreatedEvent)
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
