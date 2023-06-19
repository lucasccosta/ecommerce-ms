import { ProductsModel } from "../../config/db/sequelize/models/ProductsModel";
import { IProductsRepository } from "./IProductsRepositoryRepository";

export class ProductsRepository implements IProductsRepository {
  private ProductsModel = ProductsModel;

  async createProducts({name, code, quantity, price}): Promise<ProductsModel>{
    return await this.ProductsModel.create({name, code, quantity, price});
  }

  async getProductByCode(code): Promise<ProductsModel> {
    return await this.ProductsModel.findOne(code)
  }
}
