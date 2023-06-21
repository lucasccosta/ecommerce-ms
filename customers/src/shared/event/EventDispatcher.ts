import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";
import IEvent from "./IEvent";

export default class EventDispatcher implements IEventDispatcher {
  // O eventName é uma string, e o tipo do eventHandlers é um array da eventHandlersInterfaces
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    // pega o evento baseado no nome da classe
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: IEventHandler): void {
    // Nota mental: this.eventHandlers[eventName] == this.eventHandlers.eventName
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
