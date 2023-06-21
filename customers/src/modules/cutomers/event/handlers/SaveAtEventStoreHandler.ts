import CustomerCreatedEvent from "../CustomerCreatedEvent";
import IEventHandler from "../../../../shared/event/IEventHandler";
import { IEventsRepository } from "../../../../infra/repositories/eventsRepository/IEventsRepository";

export default class SaveAtEventStoreHandler
  implements IEventHandler
{
  private eventsRepository: IEventsRepository

  constructor(eventsRepository: IEventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async handle(event: CustomerCreatedEvent): Promise<void> {
    await this.eventsRepository.create({eventData: event.eventData, createdAt: event.createdAt})
  }
}
