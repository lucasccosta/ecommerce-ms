import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductsUseCase } from "./CreateProductsUseCase";

export class CreateProductsController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    const { name, code, price, quantity } = httpRequest.body;

    const createProductsUseCase = container.resolve(CreateProductsUseCase);

    try {
      const response = await createProductsUseCase.execute({
        name,
        code,
        price,
        quantity,
      });

      return httpResponse.status(201).send(response);
    } catch (error) {
      return httpResponse.status(error.status).send(error.message);
    }
  }
}
