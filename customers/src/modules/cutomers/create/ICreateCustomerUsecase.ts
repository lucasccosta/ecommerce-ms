import { HttpResponse } from "../../../infra/DTOs";
import { ICreateCustomerRequest } from "../DTOs";

export interface ICreateCustomerUseCase {
  execute({ name, email, password, phone }: ICreateCustomerRequest): Promise<HttpResponse>
}