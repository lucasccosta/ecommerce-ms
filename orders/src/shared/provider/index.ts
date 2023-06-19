import { container } from "tsyringe";
import { KafkaProducer } from "../../infra/provider/kafka/producer/KafkaProducer";
import { IKafkaProducer } from "../../infra/provider/kafka/producer/IKafkaProducer";

container.registerSingleton<IKafkaProducer>(
  "KafkaProducer",
  KafkaProducer
);
