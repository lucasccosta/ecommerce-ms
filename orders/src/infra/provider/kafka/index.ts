import { Kafka } from "kafkajs";
import 'dotenv/config'

const kafka = new Kafka({

  brokers: ['relevant-jay-11734-us1-kafka.upstash.io:9092'],

  sasl: {

    mechanism: 'scram-sha-256',

    username: process.env.KAFKA_USERNAME,

    password: process.env.KAFKA_PASSWORD

  },
  ssl: true,
})


export { kafka }
