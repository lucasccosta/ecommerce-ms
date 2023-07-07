import { inject, injectable } from "tsyringe";
import { IKafkaProducer } from "../../infra/provider/kafka/producer/IKafkaProducer";
import axios from "axios";
import { IOrdersRepository } from "../../infra/repositories/orders/IOrdersRepository";
import { CreateOrderRequest } from "../../infra/DTOs";
import { CustomError } from "../../infra/CustomError";
import { ICustomersRepository } from "../../infra/repositories/customers/ICustomersRepository";
import { IProductsRepository } from "../../infra/repositories/products/IProductsRepository";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("KafkaProducer")
    private KafkaProducer: IKafkaProducer
  ) {}

  async execute(data: CreateOrderRequest) {
    const customer = await this.customersRepository.getByExternalId({
      externalId: data.customerId,
    });
    console.log("customer: ", customer);
    if (!customer) throw new CustomError("Customer does not exists");
    try {
      data.items.forEach(async (item) => {
        console.log("entrou no forEach", item);
        const product = await this.productsRepository.getById(item.productId);
        const itemInStock = await axios.post(
          "http://localhost:3331/products/availability",
          {
            productId: product.externalId,
            quantity: item.quantity,
          }
        );
        if (itemInStock) return;
        throw new CustomError(
          `Product with productId: ${item.productId} is not available anymore`
        );
      });
      console.log("passou do forEach");
      const orderCreated = await this.ordersRepository.createOrder({
        customerId: customer.id,
        items: data.items,
      });

      console.log("criou a order: ", orderCreated);
      await this.KafkaProducer.sendMessage("ORDER_CREATED", {
        orderId: orderCreated.id,
        customerEmail: customer.email,
        orderItems: data.items,
      });
      console.log("terminou");
      return {
        body: "Order Created",
        statusCode: 201,
      };
    } catch (error) {
      return {
        statusCode: 404,
        error: new CustomError("An error occurred"),
      };
    }
  }
}
