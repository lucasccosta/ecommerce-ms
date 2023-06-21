import IEvent from "./IEvent";

export default interface IEventHandler<
  // evento do tipo "T" é um IEvent e seu valor padrão é tipo IEvent
  // logo esse evento deve implementar o IEvent
  T extends IEvent = IEvent
> {
  handle(event: T): void;
}
