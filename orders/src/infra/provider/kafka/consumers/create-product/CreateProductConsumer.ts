import { inject, injectable } from "tsyringe";
import { kafkaConsumer } from "../KafkaConsumer";
import { IProductsRepository } from "../../../../repositories/products/IProductsRepository";

type IProductConsumer = {
  code: string;
  id: string;
};

@injectable()
export class ProductConsumer {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  createProductConsumer = async () => {
    const consumer = await kafkaConsumer("PRODUCT_CREATED");
    await consumer.run({
      eachMessage: async ({ message }) => {
        // message is in Buffer
        const messageToString = message.value!.toString();
        console.log(messageToString);

        const product = JSON.parse(messageToString) as IProductConsumer;

        // usar o repositorio

        await this.productsRepository.createProduct({
          externalId: product.id,
          code: product.code,
        });
      },
    });
  };

  private;
}
