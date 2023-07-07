import { Orders } from "@prisma/client";
import { CreateOrderRequest } from "../../DTOs";

export interface IOrdersRepository {
  createOrder(data: CreateOrderRequest): Promise<Orders>;
}
