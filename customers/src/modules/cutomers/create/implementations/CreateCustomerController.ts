import { ICreateCustomerUseCase } from "../ICreateCustomerUsecase";
import { HttpRRequest, HttpResponse } from "../../../../infra/DTOs";

export class CreateCustomerController {
  private createCustomerUseCase: ICreateCustomerUseCase;
  
  constructor(createCustomerUseCase: ICreateCustomerUseCase) {
    this.createCustomerUseCase = createCustomerUseCase;
  }


  async handle(
    httpRequest: HttpRRequest,
  ): Promise<HttpResponse> {
    const { name, email, password, phone } = httpRequest.body;

    const response: HttpResponse = await this.createCustomerUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    return response;
  }
}
