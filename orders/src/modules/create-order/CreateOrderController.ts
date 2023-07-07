import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    const { customerId, items } = httpRequest.body;

    const createProductsUseCase = container.resolve(CreateOrderUseCase);

    try {
      const response = await createProductsUseCase.execute({
        customerId,
        items,
      });

      return httpResponse.status(201).send(response);
    } catch (error) {
      return httpResponse.status(error.status).send(error.message);
    }
  }
}
