import { EventsModel } from "../../../config/db/sequelize/models/EventsModel";
import { IEventsRepository } from "./IEventsRepository";

export class EventsRepository implements IEventsRepository {
  async create({eventData, createdAt}): Promise<void>{
    await EventsModel.create({eventData, createdAt})
  }
}