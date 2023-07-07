import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../../infra/repositories/IProductsRepository";
import { CustomError } from "../../../infra/CustomError";
import { HttpResponse } from "../../../infra/DTOs";

@injectable()
export class CheckProductAvailabilityUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ productId, quantity }): Promise<HttpResponse> {
    const product = await this.productsRepository.getProductById(productId);
    if (!product) throw new CustomError(`Product does not exists`, 409);

    const productIsAvailable = product.checkAvailability(quantity);
    if (!productIsAvailable)
      throw new CustomError(
        "This product's quantity is not available in stock",
        422
      );

    return {
      // body: true,
      body: product,
      statusCode: 201,
    };
  }
}
