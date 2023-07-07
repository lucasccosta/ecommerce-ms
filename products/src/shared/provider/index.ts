import { container } from "tsyringe";
import { KafkaProducer } from "../../infra/kafka/producer/KafkaProducer";
import { IKafkaProducer } from "../../infra/kafka/producer/IKafkaProducer";

container.registerSingleton<IKafkaProducer>("KafkaProducer", KafkaProducer);
