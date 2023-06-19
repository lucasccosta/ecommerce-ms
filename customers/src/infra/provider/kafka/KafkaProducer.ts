import { kafka } from ".";
import { IKafkaProducer } from "./IKafkaProducer";

export class KafkaProducer implements IKafkaProducer {
  async sendMessage(topic: string, payload: any): Promise<void>{
    const producer = kafka.producer({
      allowAutoTopicCreation: true,
    })

    await producer.connect()
    console.log(`MESSAGE SENT TO TOPIC ${topic}`)
    console.log(payload)

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }]
    })

    await producer.disconnect()
  }
}