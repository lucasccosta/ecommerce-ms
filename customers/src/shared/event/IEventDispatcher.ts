import IEventHandler from "./IEventHandler";
import IEvent from "./IEvent";

export default interface IEventDispatcher {
  notify(event: IEvent): void;
  register(eventName: string, eventHandler: IEventHandler): void;
  unregister(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}
