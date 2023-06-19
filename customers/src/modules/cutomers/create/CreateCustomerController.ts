import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

export class CreateCustomerController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    const { name, email, password, phone } = httpRequest.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const response = await createCustomerUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    return httpResponse.status(201).send(response);
  }
}
