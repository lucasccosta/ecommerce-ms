import { IOrdersRepository } from "./IOrdersRepository";
import { prisma } from "../../database/prismaClient";
import { Orders } from "@prisma/client";
import { CreateOrderRequest } from "../../DTOs";

export class OrdersRepository implements IOrdersRepository {
  private ordersModel = prisma.orders;

  async createOrder(data: CreateOrderRequest): Promise<Orders> {
    try {
      return await this.ordersModel.create({
        data: {
          customerId: data.customerId,
          OrderItems: {
            createMany: {
              data: data.items,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
