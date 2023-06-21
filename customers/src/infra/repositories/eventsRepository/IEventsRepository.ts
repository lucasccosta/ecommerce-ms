
export interface IEventsRepository {
  create({eventData, createdAt}): Promise<void>
}