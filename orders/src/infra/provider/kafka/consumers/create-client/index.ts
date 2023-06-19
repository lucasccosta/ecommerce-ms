import { inject, injectable } from "tsyringe";
import { kafkaConsumer } from "../KafkaConsumer"
import { Consumer } from "kafkajs"
import { ICustomersRepository } from "../../../../repositories/ICustomersRepository";

type CustomerConsumer = {
  email: string;
  id: string;
}

@injectable()
export class Consumers {
  private consumer: Consumer

  constructor(
    @inject("CustomersRepository")
    private CustomersRepository: ICustomersRepository,
  ) {}

  createCustomerConsumer = async() =>{
    const consumer = await kafkaConsumer("CUSTOMER_CREATED")
    await  consumer.run({
      eachMessage: async ({message}) => {
        // message is in Buffer
        const messageToString = message.value!.toString()
        console.log(messageToString)
        
        const customer = JSON.parse(messageToString) as CustomerConsumer

  
        // usar o repositorio

        await this.CustomersRepository.createCustomer({
          externalId: customer.id,
          email: customer.email
        })
      }
    })
  }

  private 
}

// export const createCustomerConsumer = async() =>{
//   const consumer = await kafkaConsumer("CUSTOMER_CREATED")
//   await  consumer.run({
//     eachMessage: async ({message}) => {
//       // message is in Buffer
//       const messageToString = message.value!.toString()
//       console.log(messageToString)
      
//       const customer = JSON.parse(messageToString) as CustomerConsumer

//       // usar o repositorio
//     }
//   })
// }

// createCustomerConsumer()
