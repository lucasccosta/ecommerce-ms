import { container } from "tsyringe";
import { IKafkaProducer } from "../../infra/provider/kafka/IKafkaProducer";
import { KafkaProducer } from "../../infra/provider/kafka/KafkaProducer";

container.registerSingleton<IKafkaProducer>(
  "KafkaProducer",
  KafkaProducer
);
