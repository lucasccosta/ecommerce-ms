import { KafkaProducer } from "../../../../infra/provider/kafka/KafkaProducer"
import { CustomersRepository } from "../../../../infra/repositories/customer/CustomersRepository"
import { EventsRepository } from "../../../../infra/repositories/eventsRepository/EventsRepository"
import EventDispatcher from "../../../../shared/event/EventDispatcher"
import CustomerCreatedHandler from "../../event/handlers/CustomerCreatedHandler"
import SaveAtEventStoreHandler from "../../event/handlers/SaveAtEventStoreHandler"
import { CreateCustomerController } from "../implementations/CreateCustomerController"
import { CreateCustomerUseCase } from "../implementations/CreateCustomerUseCase"


export const createCustomerControllerFactory = () => {
  const customersRepository = new CustomersRepository()
  const kafkaProducer = new KafkaProducer()
  const eventDispatcher = new EventDispatcher()
  const customerCreatedHandler = new CustomerCreatedHandler(kafkaProducer)
  const eventsRepository = new EventsRepository()
  const saveAtEventStoreHandler = new SaveAtEventStoreHandler(eventsRepository)
  const createCustomerUseCase = new CreateCustomerUseCase(
    customersRepository,
    eventDispatcher,
    customerCreatedHandler,
    saveAtEventStoreHandler
    )
  const createCustomerController = new CreateCustomerController(createCustomerUseCase)
  return createCustomerController
}