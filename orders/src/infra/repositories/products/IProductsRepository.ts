import { Products } from "@prisma/client";

type ICreateProduct = {
  externalId: string;
  code: string;
};

export interface IProductsRepository {
  createProduct({ externalId, code }: ICreateProduct): Promise<Products>;
  getById(id: string): Promise<Products>;
}
