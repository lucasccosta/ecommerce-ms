import { KafkaProducer } from "../../../../infra/provider/kafka/KafkaProducer"
import { CustomersRepository } from "../../../../infra/repositories/CustomersRepository"
import { CreateCustomerController } from "../implementations/CreateCustomerController"
import { CreateCustomerUseCase } from "../implementations/CreateCustomerUseCase"


export const createCustomerControllerFactory = () => {
  const customersRepository = new CustomersRepository()
  const kafkaProducer = new KafkaProducer()
  const createCustomerUseCase = new CreateCustomerUseCase(customersRepository, kafkaProducer)
  const createCustomerController = new CreateCustomerController(createCustomerUseCase)
  return createCustomerController
}