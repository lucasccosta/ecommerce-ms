import { KafkaProducer } from "../../infra/provider/kafka/KafkaProducer";
import CustomerCreatedEvent from "../../modules/cutomers/event/CustomerCreatedEvent";
import CustomerCreatedHandler from "../../modules/cutomers/event/handlers/CustomerCreatedHandler";
import EventDispatcher from "./EventDispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const kafkaProducer = new KafkaProducer();
    const eventHandler = new CustomerCreatedHandler(kafkaProducer);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an registered event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const kafkaProducer = new KafkaProducer();
    const eventHandler = new CustomerCreatedHandler(kafkaProducer);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      0
    );
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const kafkaProducer = new KafkaProducer();
    const eventHandler = new CustomerCreatedHandler(kafkaProducer);
    // Ele "espia" se o método handle será executado
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    // Quando o notify for executado, o SendEmailWhenProductIsCreatedHandle.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
