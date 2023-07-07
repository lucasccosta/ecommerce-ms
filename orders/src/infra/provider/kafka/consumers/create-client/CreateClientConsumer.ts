import { inject, injectable } from "tsyringe";
import { kafkaConsumer } from "../KafkaConsumer";
import { ICustomersRepository } from "../../../../repositories/customers/ICustomersRepository";

type ICustomerConsumer = {
  email: string;
  id: string;
};

@injectable()
export class CustomerConsumer {
  constructor(
    @inject("CustomersRepository")
    private CustomersRepository: ICustomersRepository
  ) {}

  createCustomerConsumer = async () => {
    const consumer = await kafkaConsumer("CUSTOMER_CREATED");
    await consumer.run({
      eachMessage: async ({ message }) => {
        // message is in Buffer
        const messageToString = message.value!.toString();
        console.log(messageToString);

        const customer = JSON.parse(messageToString) as ICustomerConsumer;

        await this.CustomersRepository.createCustomer({
          externalId: customer.id,
          email: customer.email,
        });
      },
    });
  };
}
