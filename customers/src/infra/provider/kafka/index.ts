import { Kafka } from "kafkajs";

const kafka = new Kafka({

  brokers: ['relevant-jay-11734-us1-kafka.upstash.io:9092'],

  sasl: {

    mechanism: 'scram-sha-256',

    username: 'cmVsZXZhbnQtamF5LTExNzM0JIDkJjsMAxN56V_HdcSb-3dOUAxI5KOEwrfLjnY',

    password: '744f636937024c4f92f96fd2ad97388f'

  },
  ssl: true,
})


export { kafka }
