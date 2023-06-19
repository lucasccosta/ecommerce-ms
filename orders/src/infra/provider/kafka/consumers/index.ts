import { container } from 'tsyringe'
import './create-client/index'
import { Consumers } from './create-client/index'

const consumer = container.resolve(Consumers)

consumer.createCustomerConsumer()