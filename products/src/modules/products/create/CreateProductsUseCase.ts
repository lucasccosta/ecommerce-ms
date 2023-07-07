import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../../infra/repositories/IProductsRepository";
import { IKafkaProducer } from "../../../infra/kafka/producer/IKafkaProducer";
import { HttpResponse } from "../../../infra/DTOs";
import { CustomError } from "../../../infra/CustomError";

@injectable()
export class CreateProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("KafkaProducer")
    private KafkaProducer: IKafkaProducer
  ) {}

  async execute({ name, code, quantity, price }): Promise<HttpResponse> {
    const product = await this.productsRepository.getProductByCode(code);
    if (product) throw new CustomError(`Product already exists`, 409);

    try {
      const productCreated = await this.productsRepository.createProducts({
        name,
        code,
        quantity,
        price,
      });

      await this.KafkaProducer.sendMessage("PRODUCT_CREATED", {
        id: productCreated.dataValues.id,
        code: productCreated.dataValues.code,
      });
      return {
        body: "Product Created",
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
