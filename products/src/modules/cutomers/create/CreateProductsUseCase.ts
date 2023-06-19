import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../../infra/repositories/IProductsRepositoryRepository";
import { IKafkaProducer } from "../../../infra/kafka/producer/IKafkaProducer";

@injectable()
export class CreateProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("KafkaProducer")
    private KafkaProducer: IKafkaProducer
  ) {}

  async execute({
    name,
    code,
    quantity,
    price,
  }): Promise<string> {
    const product = await this.productsRepository.getProductByCode(code);
    if (product) throw new Error(`Product already exists`);

    try {
      const productCreated = await this.productsRepository.createProducts({
        name,
        code,
        quantity,
        price,
      });

      await this.KafkaProducer.sendMessage('PRODUCT_CREATED', productCreated)
      return "Customer Created";
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
}
