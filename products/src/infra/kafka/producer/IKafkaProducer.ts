
export interface IKafkaProducer {
  sendMessage(topic: string, payload: any): Promise<void>
}