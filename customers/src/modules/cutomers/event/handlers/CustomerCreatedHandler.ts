import CustomerCreatedEvent from "../CustomerCreatedEvent";
import { IKafkaProducer } from "../../../../infra/provider/kafka/IKafkaProducer";
import IEventHandler from "../../../../shared/event/IEventHandler";

export default class CustomerCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  private kafkaProducer: IKafkaProducer

  constructor(kafkaProducer: IKafkaProducer) {
    this.kafkaProducer = kafkaProducer;
  }
  async handle(event: CustomerCreatedEvent): Promise<void> {
    await this.kafkaProducer.sendMessage('CUSTOMER_CREATED', event)
  }
}
