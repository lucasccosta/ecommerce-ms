import IEvent from "../../../shared/event/IEvent";

export default class SaveAtEventStore implements IEvent {
  createdAt: Date;
  eventData: any;

  constructor(eventData: any) {
    this.createdAt = new Date();
    this.eventData = eventData;
  }
}
