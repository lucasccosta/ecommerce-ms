import { Request, Response } from "express";
import { container } from "tsyringe";
import { CheckProductAvailabilityUseCase } from "./CheckProductAvailabilityUseCase";

export class CheckProductAvailabilityController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    const { productId, quantity } = httpRequest.body;

    const createProductsUseCase = container.resolve(
      CheckProductAvailabilityUseCase
    );

    try {
      const response = await createProductsUseCase.execute({
        productId,
        quantity,
      });

      return httpResponse.status(201).send(response);
    } catch (error) {
      return httpResponse.status(error.status).send(error.message);
    }
  }
}
