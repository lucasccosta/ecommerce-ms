import { IProductsRepository } from "./IProductsRepository";
import { prisma } from "../../database/prismaClient";
import { Products } from "@prisma/client";
export class ProductsRepository implements IProductsRepository {
  private productsModel = prisma.products;

  async createProduct({ externalId, code }): Promise<Products> {
    return await this.productsModel.create({
      data: {
        externalId,
        code,
      },
    });
  }

  async getById(id: string): Promise<Products> {
    return await this.productsModel.findUnique({ where: { id } });
  }
}
